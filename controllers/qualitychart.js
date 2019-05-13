exports.index = function(req, res, next) {
    res.render('qualitychart', {
        title: 'La charte de qualité Imoges',
        topNavActive: 'company',
        sideNavActive: 'qualitychart',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Imoges', link: '/company'},
            {label: 'Charte de qualité'}
        ]
    });
};