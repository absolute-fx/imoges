exports.index = function(req, res) {
    console.log(req.session.token);
    if(!req.session.token){
        res.render('login', {
            title: 'Espace client',
            topNavActive: 'account',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Connection'}
            ],
            css_paths: [

            ],
            js_paths:[
                "/javascripts/auth.js"
            ]
        });
    }else{
        let ext, http, port;
        if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
            ext = 'loc';
            http = 'http';
            port = ':3000'
        }else{
            ext = 'be';
            http = 'https';
            port ='';
        }
        res.redirect(302, http + "://imoges." + ext + port + "/account");
    }
};