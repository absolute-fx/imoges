const Projects = require('../repositories/Projects');
const Realties = require('../repositories/Realties');

exports.index = function(req, res, next) {
    const projectId = req.query.id;
    const active = 1;
    const diffused = 1;
    const media = 1;
    Projects.getOne({projectId, active, diffused, media}).then(project =>{
        console.log(project);
        if(project){
            let projectId = project.id;
            Realties.getByProject({projectId:projectId, media: 1}).then(realties =>{
                console.log(realties);
                res.render('project', {
                    title: project.project_title,
                    topNavActive: 'projects',
                    breadcrumb: [
                        {label: 'Accueil', link: '/'},
                        {label: 'Projets', link: '/projects'},
                        {label: project.project_title}
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
                        "/javascripts/gmap.js",
                        "/javascripts/gal_cat_switcher.js"
                    ],
                    project: project,
                    realties: realties
                });
            });
        }else {
            const limit = 4;
            const status = 0;
            const active = 1;
            const media = 1;
            const order_field = "id";
            const order_direction = "desc";
            Realties.getAll({limit, status, active, media, order_field, order_direction}).then(realties =>{
                res.render('project', {
                    title: "Aucun projet sur cette page",
                    topNavActive: 'projects',
                    breadcrumb: [
                        {label: 'Accueil', link: '/'},
                        {label: 'Projets', link: '/projects'},
                        {label: "Projet non disponible"}
                    ],
                    realties: realties
                });
            });
        }
    });
};