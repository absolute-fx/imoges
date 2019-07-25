exports.index = function(req, res, next) {
    res.render('about', {
        title: 'A propos de la société',
        topNavActive: 'company',
        sideNavActive: 'about',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Imoges', link: '/company'},
            {label: 'A propos'}
        ],
        library: [
            {library_media_name : "01-maxi.jpg", library_media_url : "/images/temp_projects/gal/"}
        ]
    });
};