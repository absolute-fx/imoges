const Realties = require('../repositories/Realties');
const Projects = require('../repositories/Projects');

exports.index = function(req, res, next) {
    const limit = 2;
    const status = 0;
    const active = 1;
    const media = 1;
    const orderField = "id";
    const orderDirection = "desc";
    Projects.getAll({limit, status, active, media, orderField, orderDirection}).then(projects =>{
        console.log(projects);
        res.render('index', {
            title: 'Imoges - Promotion immobilière',
            page_description: "La société Imoges a été fondée en  2006 et a actuellement porté " + projects.length + " projets immobiliers sur Ecaussinnes, Soignies et Braine le Comte.",
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
            projects: projects
        });
    });
};