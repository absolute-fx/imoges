exports.index = function(req, res, next) {
    res.render('press', {
        title: 'Revue de presse',
        topNavActive: 'company',
        sideNavActive: 'press',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Imoges', link: '/company'},
            {label: 'Revue de presse'}
        ]
    });
};