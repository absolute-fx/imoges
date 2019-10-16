const LibrarieCategories = require("../repositories/Librarycategories");
exports.index = function(req, res, next) {
    const cat = "youtube";
    const orderField = "id";
    const orderDirection = "desc";
    //LibrarieCategories.getAll({cat, orderField, orderDirection}).then(videos => {
        //console.log(videos);
        res.render('videogal', {
            title: 'Galerie vidéo Imoges',
            topNavActive: 'media',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Galerie vidéo'}
            ],
            //videos: videos
        //});
    });
};