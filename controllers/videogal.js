const LibrarieCategories = require("../repositories/Librarycategories");
exports.index = function(req, res, next) {
    LibrarieCategories.getAll({type: "video", orderField: "createdAt", orderDirection: "desc"}).then(videos => {
        //console.log(videos);
        const lastVideo = videos[0];
        videos.shift();
        console.log(videos);
        res.render('videogal', {
            title: 'Galerie vidéo Imoges',
            topNavActive: 'media',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Galerie vidéo'}
            ],
            lastVideo: lastVideo,
            videos: videos
        });
    });
};