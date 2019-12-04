
exports.index = function(req, res) {
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
};

exports.userData = function (req, res) {
    res.render('userdata', {
        title: 'Données utilisateur',
        topNavActive: 'account',
        sideNavActive: 'user',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Mon compte', link: '/account'},
            {label: 'Mes données'}
        ],
        js_paths:[

        ]
    });
};