exports.index = function(req, res, next) {
    res.render('project', {
        title: 'INES II',
        topNavActive: 'projects',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Projets', link: '/projects'},
            {label: 'project name'}
        ],
            css_paths: [
                "/javascripts/plugins/slider.revolution/css/extralayers.css",
                "/javascripts/plugins/slider.revolution/css/settings.css"
            ],
            js_paths:[
                "/javascripts/plugins/slider.revolution/js/jquery.themepunch.tools.min.js",
                "/javascripts/plugins/slider.revolution/js/jquery.themepunch.revolution.min.js",
                "/javascripts/home_slider.js",
                "https://maps.googleapis.com/maps/api/js?key=" + req.app.locals.ws_settings.coreConfig.gmapKey,
                "/javascripts/gmap.js"
            ],
        project:{
            id: 40,
            project_title: "Alexander II",
            project_type: 2,
            project_address: "Rue Steenkerque",
            project_city: "Soignies",
            project_pc: "7060",
            project_country: "be",
            project_active_online: 1,
            project_start_build_date: "2019-08-15 00:00:00",
            project_end_build_date: "",
            project_end_build_date_expect: "2020-12-15 00:00:00",
            project_ref: "Alex2",
            project_peb: "A",
            project_long_description: "La <strong>résidence  INES II </strong> est située à un jet de pierre de la collégiale et de son centre historique, une situation hors du commun, proche des commerces, d’écoles, des transports en commun ainsi que des axes routiers. Les alentours permettent d’agréables promenades." +
            "<br>" +
            "Le projet a été étudié dans un souci global de développement durable et d'économie d'énergie: chaudière au gaz haut rendement , isolation importante des parois de déperdition et chauffage par le sol ainsi que l’utilisation d’un système double flux. (catégorie basse énergie PEB A)." +
            "<br>" +
            "Nous apportons une attention toute particulière à l’isolation acoustique de chacune de nos réalisations." +
            "<br>" +
            "L’aménagement intérieur de nos appartements est réalisé en fonction des demandes formulées par nos clients , nous possédons l’avantage d’une gestion personnalisée pour chacun de nos acquéreurs.",
            project_lat: "50.56681600897844",
            project_long: "4.16819238974914",
            project_libraries: [
                {Library_category_label: "3D", libraries:[
                    {library_media_name: "shot-01-web.jpg", library_media_url: "upload/Projets/32/81/medias", library_media_type: "jpg"},
                    {library_media_name: "shot-02-web.jpg", library_media_url: "upload/Projets/32/81/medias", library_media_type: "jpg"},
                    {library_media_name: "shot-03-web.jpg", library_media_url: "upload/Projets/32/81/medias", library_media_type: "jpg"},
                    {library_media_name: "shot-04-web.jpg", library_media_url: "upload/Projets/32/81/medias", library_media_type: "jpg"},
                    {library_media_name: "shot-06-web.jpg", library_media_url: "upload/Projets/32/81/medias", library_media_type: "jpg"},
                    {library_media_name: "shot-08-web.jpg", library_media_url: "upload/Projets/32/81/medias", library_media_type: "jpg"},
                    {library_media_name: "shot-09-web.jpg", library_media_url: "upload/Projets/32/81/medias", library_media_type: "jpg"}
                ]},
                {Library_category_label: "Documents", libraries:[
                    {library_media_name: "cahier des charges 1 chambre.pdf", library_media_url: "upload/Projets/32/81/documents", library_media_type: "pdf"},
                    {library_media_name: "cahier des charges 2 chambres.pdf", library_media_url: "upload/Projets/32/81/documents", library_media_type: "pdf"},
                    {library_media_name: "cahier des charges 1 chambre.doc", library_media_url: "upload/Projets/32/81/documents", library_media_type: "docx"}
                ]},
                {Library_category_label: "3D animée", libraries:[
                    {library_media_name: "Résidence Ines", library_media_url: "http://www.youtube.com/embed/oA9KGVUVYPw", library_media_type: "youtube"},
                    {library_media_name: "Résidence Ines", library_media_url: "https://sketchfab.com/models/c1ec451e187048008312ef72fccdfc5a/embed", library_media_type: "sketchfab"},
                ]}
            ],
            realties: [
                {realty_net_price: 148000, realty_vat: 21},
                {realty_net_price: 132000, realty_vat: 21},
                {realty_net_price: 152000, realty_vat: 21}
            ],
            project_actual_phase: 1,
            project_phases:[
                {title: "Fondation", id:0},
                {title: "Gros-œuvre", id:1},
                {title: "Toiture", id:2},
                {title: "Finitions", id:3},
                {title: "Terminé", id:4}
            ]
        }
    });
};