const Projects = require('../repositories/Projects');

exports.index = function(req, res, next) {
    const active = 1;
    const orderField = "id";
    const orderDirection = "desc";
    const diffused = 1;
    const media = 1;
    Projects.getAll({active, orderField, orderDirection, diffused, media}).then(projects =>{
        console.log(projects);
        //projects.genericImages = tools.getGenericImages("2019-07-29 00:00:00");

        // TEMP
        for(let i in projects){
            projects[i].project_media = ["/images/temp_projects/demoiselles.jpg"];
        }
        // TEMP

        res.render('projects', {
            title: 'Les projets Imoges',
            topNavActive: 'projects',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Projets'}
            ],
            projects: projects
        });
    });
};
