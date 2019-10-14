exports.index = function(req, res, next) {
    res.render('photogal', {
        title: 'Galerie photo Imoges',
        topNavActive: 'media',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Galerie photo'}
        ],
        media: [
            {media_url : "/images/temp_projects/gal/01-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/02-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/03-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/04-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/05-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/06-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/07-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/08-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/09-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/10-maxi.jpg"},
            {media_url : "/images/temp_projects/gal/11-maxi.jpg"}
        ]
    });
};