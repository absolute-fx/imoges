const Auth = require("../repositories/Auth");

exports.signin = function(req, res, next) {

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

exports.signup = function(req, res, next) {

    Auth.signup(req.body).then( data => {
        console.log("Data sent");
        res.send(data);
    });
};

exports.validate = function(req, res, next){
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

exports.validationMail = function(req, res, next){
    Auth.validationMail(req.query).then(data =>{
        let viewData = {sent: true, message: "Le mail contenant votre lien de validation vient de vous être envoyé. Vérifier votre messagerie"};
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
    Auth.resetPass().then( data =>{
        
    }).catch();
};