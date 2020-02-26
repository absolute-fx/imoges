exports.index = function(req, res) {
    console.log(req.session.token);
    if(!req.session.token){
        let tpl = req.mainDomain ? 'login' : 'partner_login';
        let title = req.mainDomain ? 'Espace client' : 'Espace partenaire';
        let jsPath = req.mainDomain ? '/javascripts/auth.js' : '/javascripts/auth_partner.js';
        res.render(tpl, {
            title: title,
            topNavActive: 'account',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Connection'}
            ],
            css_paths: [

            ],
            js_paths:[
                jsPath
            ]
        });
    }else{
        let ext, http, port, subdomain;
        if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
            ext = 'loc';
            http = 'http';
            port = ':3000'
        }else{
            ext = 'be';
            http = 'https';
            port ='';
        }
        subdomain = req.mainDomain ? '' : 'partners.';
        res.redirect(302, http + "://" + subdomain + "imoges." + ext + port + "/account");
    }
};