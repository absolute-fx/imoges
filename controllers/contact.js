const config = require('../config/config');
const Projects = require('../repositories/Projects');
const Tools = require('../classes/Tools');

exports.index = function(req, res, next) {
    const status = 0;
    const active = 1;
    const orderField = "id";
    const orderDirection = "desc";
    const realties = 1;
    Projects.getAll({status, active, orderField, orderDirection, realties}).then(projects => {
        console.log(projects);
        let p = Tools.getRealtiesAvailability(projects);
        res.render('contact', {
            title: 'Contactez Imoges',
            page_description: "Contactez Imoges via notre formulaire en ligne ou directement au " + config.company.phone,
            topNavActive: 'contact',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Contact avant vente'}
            ],
            js_paths: [
                "/javascripts/contact.js"
            ],
            projects: p
        });
    });
};