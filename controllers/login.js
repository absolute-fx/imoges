exports.index = function(req, res, next) {

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

};