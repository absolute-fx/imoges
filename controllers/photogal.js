exports.index = function(req, res, next) {
    let media = [];
    for (let i=1; i<= 55; i++){
        media.push({thumb: '/images/website_gal/thumb_' + i + '.jpg', fhd: '/images/website_gal/fhd_' + i + '.jpg'});
    }
    res.render('photogal', {
        title: 'Galerie photo Imoges',
        topNavActive: 'media',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Galerie photo'}
        ],
        media: media
    });
};