
exports.index = function(req, res, next) {
    console.log(req.session.token);
    if(req.session.token){
        res.render('account', {
            title: 'Espace client',
            topNavActive: 'account',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Mon compte'}
            ],
            css_paths: [

            ],
            js_paths:[

            ],
            user: req.session.user
        });
    }
};