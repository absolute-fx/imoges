const Projects = require('../repositories/Projects');

exports.index = function(req, res, next) {
    const active = 1;
    const orderField = "project_start_build_date";
    const orderDirection = "desc";
    const diffused = 1;
    const media = 0;

    Projects.getAll({active, orderField, orderDirection, diffused, media}).then(projects => {
        console.log(projects);

        res.render('history', {
            title: 'Historique de la société',
            page_description: "La société Imoges a été fondée en  2006 et a actuellement porté " + projects.length + " projets immobiliers sur Ecaussinnes, Soignies et Braine le Comte.",
            topNavActive: 'company',
            sideNavActive: 'history',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Imoges', link: '/company'},
                {label: 'Historique'}
            ],
            history: projects
        });
    });
};