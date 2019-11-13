const Projects = require('../repositories/Projects');

exports.index = function(req, res, next) {
    const active = 1;
    const orderField = "id";
    const orderDirection = "desc";
    const diffused = 1;
    const media = 1;
    Projects.getAll({active, orderField, orderDirection, diffused, media}).then(projects =>{
        console.log(projects);

        res.render('projects', {
            title: 'Les projets Imoges',
            page_description: "Liste de tous les projets de la société immobilière Imoges",
            topNavActive: 'projects',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Projets'}
            ],
            projects: projects
        });
    });
};
