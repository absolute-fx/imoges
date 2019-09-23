exports.index = function(req, res, next) {
    res.render('qualitychart', {
        title: 'La charte de qualité Imoges',
        page_description: "Un cadre de vie agréable, une isolation thermique et acoustique performante, des matériaux de qualité",
        topNavActive: 'company',
        sideNavActive: 'qualitychart',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Imoges', link: '/company'},
            {label: 'Charte de qualité'}
        ]
    });
};