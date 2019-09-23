const Realties = require('../repositories/Realties');
const Librarycategories = require('../repositories/Librarycategories');

exports.index = function(req, res, next) {
    const status = 0;
    const active = 1;
    const media = 1;
    const realtyId = req.query.id;
    const project = 1;

    Realties.getOne({realtyId, status, active, media, project}).then(realty =>{
        console.log(realty);
        if(realty){
            const table = "projects";
            const tblId = realty.projectId;
            const cat = "generic";
            const libraryMediaExt = "jpg";

            Librarycategories.getAll({table, tblId, cat, libraryMediaExt}).then(librarycategories =>{
                console.log(librarycategories);
                res.render('realty', {
                    title: 'Imoges - Promotion immobilière',
                    page_description: realty.realty_long_description,
                    topNavActive: 'projects',
                    breadcrumb: [
                        {label: 'Accueil', link: '/'},
                        {label: 'Projets', link: '/projects'},
                        {label: realty.project.project_title, link: '/project?id=' + realty.projectId},
                        {label: realty.realty_title}
                    ],
                    css_paths: [
                        "/javascripts/plugins/slider.revolution/css/extralayers.css",
                        "/javascripts/plugins/slider.revolution/css/settings.css"
                    ],
                    js_paths:[
                        "/javascripts/plugins/slider.revolution/js/jquery.themepunch.tools.min.js",
                        "/javascripts/plugins/slider.revolution/js/jquery.themepunch.revolution.min.js",
                        "/javascripts/home_slider.js"
                    ],
                    realty: realty,
                    librarycategories: librarycategories
                });
            });
        }
        else{
            const limit = 4;
            const status = 0;
            const active = 1;
            const media = 1;
            const order_field = "id";
            const order_direction = "desc";
            Realties.getAll({limit, status, active, media, order_field, order_direction}).then(realties =>{
                res.render('realty', {
                    title: "Aucun bien sur cette page",
                    topNavActive: 'projects',
                    breadcrumb: [
                        {label: 'Accueil', link: '/'},
                        {label: 'Biens', link: '/realties'},
                        {label: "Bien non disponible"}
                    ],
                    realties: realties
                });
            });
        }
    });
};