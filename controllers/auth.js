const Auth = require("../repositories/Auth");
const Partners = require("../repositories/Partners");

exports.signin = function(req, res) {
    Auth.singin(req.body).then( data => {
        console.log("Signin Data sent");
        if(data.auth){
            req.session.token = data.accessToken;
            req.session.user = data.user;

            data.user.roles.forEach((role)=>{
                req.session.isAdmin = role.name === 'ADMIN';
                req.session.isPartner = role.name === 'PARTNER';
            });
            if(req.session.isPartner){
                Partners.getOne(req.session.user.id).then((partner)=>{
                    req.session.partner = partner;
                    //console.log(partner);
                    res.send(data);
                });
            }else{
                res.send(data);
            }
        } else{
            res.send(data);
        }
    });
};

exports.signup = function(req, res) {
    Auth.signup(req.body).then( data => {
        console.log("Data sent");
        res.send(data);
    });
};

exports.validate = function(req, res){
    Auth.validate(req.query).then(data =>{
        console.log(data.auth);
        let viewData;
        if(data.auth){
            viewData = {auth: true, message: "Votre compte a été validé avec succès. Vous pouvez dès à présent vous connecter sur votre compte."};
        }else{
            viewData = {auth: false, message: "Le lien de validation de votre compte n'est plus actif, veuillez cliquer sur le bouton ci-dessous pour regénérer un lien de validation.", userId: data.userId};
        }
        res.render('uservalidation', {
            title: 'Validation compte',
            page_description: "Validation compte Imoges",
            breadcrumb: [
                {label: 'Accueil', link: '/'}
            ],
            viewData: viewData
        });
    });
};

exports.validationMail = function(req, res){
    Auth.validationMail(req.query).then(data =>{
        let viewData = {sent: true, message: "Le mail contenant votre lien de validation vient de vous être envoyé. Vérifiez votre messagerie"};
        res.render('mailsent', {
            title: 'Mail envoyé',
            page_description: "Mail envoyé",
            breadcrumb: [
                {label: 'Accueil', link: '/'}
            ],
            viewData: viewData
        });
    });
};

exports.forgottenPass = function(req, res){
    const mail = req.query.mail ? req.query.mail : "";
    res.render('forgottenpass', {
        title: 'Mot de passe oublié',
        page_description: "Mot de passe oublié",
        breadcrumb: [
            {label: 'Accueil', link: '/'}
        ],
        mail: mail
    });
};

exports.resetPass = function(req, res){
    //console.log(req.body);
    let viewData = {sent: true, message: "Le mail de changement de mot de passe vient de vous être envoyé. Vérifiez votre messagerie"};
    Auth.resetPass(req.body).then( data =>{
        res.render('mailsent', {
            title: 'Mail envoyé',
            page_description: "Mail envoyé",
            breadcrumb: [
                {label: 'Accueil', link: '/'}
            ],
            viewData: viewData
        });
    });
};

exports.newPass = function(req, res){
    const token = req.query.token;
    Auth.verifyToken(token).then(data =>{
        res.render('newpass', {
            title: 'Nouveau mot de passe',
            page_description: "Nouveau mot de passe",
            breadcrumb: [
                {label: 'Accueil', link: '/'}
            ],
            js_paths:[
                "/javascripts/newpass.js"
            ],
            token: token,
            valid: data.valid
        });
    });
};

exports.notValidated = function(req, res){
    const userId = req.session.user.id;
    req.session.destroy();
    res.render('awaitvalidation', {
        title: 'Compte non vérifié',
        page_description: "Compte non vérifié",
        breadcrumb: [
            {label: 'Accueil', link: '/'}
        ],
        userId: userId
    });
};

exports.verifyToken = function(req, res){
    Auth.verifyToken(req.body).then(data =>{

    });
};

exports.savePass = function(req, res){
    Auth.savePass(req.body).then(data =>{
        res.send(data);
    });
};

exports.logout = function(req, res){
    req.session.destroy();
    let ext, http, port, subdomain;
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
        ext = 'loc';
        http = 'http';
        port = ':3000';
    }else{
        ext = 'be';
        http = 'https';
        port ='';
    }
    subdomain = req.mainDomain ? '' : 'partners.';
    res.redirect(302, http + "://" + subdomain + "imoges." + ext + port + "/login");
};