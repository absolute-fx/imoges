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

/*
    a.image-hover(href="/images/temp_projects/gal/01-maxi.jpg")
        img(src="/images/temp_projects/gal/01-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/02-maxi.jpg")
        img(src="/images/temp_projects/gal/02-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/03-maxi.jpg")
        img(src="/images/temp_projects/gal/03-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/04-maxi.jpg")
        img(src="/images/temp_projects/gal/05-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/05-maxi.jpg")
        img(src="/images/temp_projects/gal/05-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/06-maxi.jpg")
        img(src="/images/temp_projects/gal/06-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/07-maxi.jpg")
        img(src="/images/temp_projects/gal/07-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/08-maxi.jpg")
        img(src="/images/temp_projects/gal/08-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/09-maxi.jpg")
        img(src="/images/temp_projects/gal/09-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/10-maxi.jpg")
        img(src="/images/temp_projects/gal/10-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/11-maxi.jpg")
        img(src="/images/temp_projects/gal/11-mini.jpg" alt="Imoges")
    a.image-hover(href="/images/temp_projects/gal/02-maxi.jpg")
        img(src="/images/temp_projects/gal/02-mini.jpg" alt="Imoges")
 */