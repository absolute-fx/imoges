const Auth = require("../repositories/Auth");

exports.signin = function(req, res) {
    Auth.singin(req.body).then( data => {
        console.log("Data sent");
        if(data.auth){
            req.session.token = data.accessToken;
            req.session.user = data.user;
            console.log(req.session);
            res.send(data);
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
    res.render('forgottenpass', {
        title: 'Mot de passe oublié',
        page_description: "Mot de passe oublié",
        breadcrumb: [
            {label: 'Accueil', link: '/'}
        ]
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
    res.render('awaitvalidation', {
        title: 'Compte non vérifié',
        page_description: "Compte non vérifié",
        breadcrumb: [
            {label: 'Accueil', link: '/'}
        ],
        userId: req.session.user.id
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