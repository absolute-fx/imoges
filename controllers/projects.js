exports.index = function(req, res, next) {
    res.render('projects', {
        title: 'Les projets Imoges',
        topNavActive: 'projects',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Projets'}
        ],
        projects: [
            {project_title: "Alexander II", project_active_online: 1, project_city: "Ecaussinnes", project_address: "Rue Perniaux", id: 40, project_media: ["/images/temp_projects/project-main-image-web.jpg", "/images/temp_projects/shot-01-v3-web.jpg", "/images/temp_projects/shot-02-v3-web.jpg"]},
            {project_title: "Les demoiselles", project_active_online: 1, project_city: "Braine Le Comte", project_address: "Rue de l'entente", id: 10, project_media:["/images/temp_projects/demoiselles.jpg"]},
            {project_title: "Ines", project_active_online: 1, project_city: "Soignies ", project_address: "Rue du Rempart du Vieux Cimetière", id: 20, project_media:["/images/temp_projects/ines.jpg"]}
        ]
    });
};