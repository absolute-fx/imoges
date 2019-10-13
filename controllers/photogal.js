exports.index = function(req, res, next) {
    res.render('photogal', {
        title: 'Galerie photo Imoges',
        topNavActive: 'media',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Galerie photo', link: '/photo'}
        ]
    });
};