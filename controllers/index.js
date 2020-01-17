const Realties = require('../repositories/Realties');
const Projects = require('../repositories/Projects');
const Tools = require('../classes/Tools');

exports.index = function(req, res, next) {
    const limit = 2;
    const status = 0;
    const active = 1;
    const media = 1;
    const orderField = "id";
    const orderDirection = "desc";
    const realties = 1;
    if(req.mainDomain){
        Projects.getAll({limit, status, active, media, orderField, orderDirection, realties}).then(projects =>{
            let p = Tools.getRealtiesAvailability(projects);
            res.render('index', {
                title: 'Imoges - Promotion immobilière',
                page_description: "La société Imoges a été fondée en  2006 et a actuellement porté une série de projets immobiliers sur Ecaussinnes, Soignies et Braine le Comte.",
                type: 'root',
                css_paths: [
                    "/javascripts/plugins/slider.revolution/css/extralayers.css",
                    "/javascripts/plugins/slider.revolution/css/settings.css"
                ],
                js_paths:[
                    "/javascripts/plugins/slider.revolution/js/jquery.themepunch.tools.min.js",
                    "/javascripts/plugins/slider.revolution/js/jquery.themepunch.revolution.min.js",
                    "/javascripts/home_slider.js"
                ],
                topNavActive: 'index',
                projects: p
            });

        });

    }else{
        // Partner dashboard
        res.render('partner_index', {
            type: 'root',
            css_paths: [

            ],
            js_paths:[
            ],
            topNavActive: 'index',
        });
    }
};