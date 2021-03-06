exports.index = function(req, res, next) {
    res.render('about', {
        title: 'A propos de la société',
        page_description: "Imoges a été fondée en 2006 par Eric Sirault et son épouse Catherine Alard, tout d'abord dans la rénovation pour ensuite se diriger vers la construction de logements neufs.",
        topNavActive: 'company',
        sideNavActive: 'about',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Imoges', link: '/company'},
            {label: 'A propos'}
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