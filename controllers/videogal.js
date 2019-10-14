exports.index = function(req, res, next) {
    res.render('videogal', {
        title: 'Galerie vidéo Imoges',
        topNavActive: 'media',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Galerie vidéo'}
        ]
    });
};