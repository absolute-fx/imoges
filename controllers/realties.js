const Realties = require('../repositories/Realties');
const Projects = require('../repositories/Projects');

exports.index = function(req, res, next) {
    const status = 0;
    const active = 1;
    let media = 0;
    const order_field ="id";
    const order_direction = "desc";
    const diffused = 1;

    Projects.getAll({active, order_field, order_direction, diffused, media}).then(projects =>{
        media = 1;
        console.log(projects);
        Realties.getAll({status, active, media, order_field, order_direction}).then(realties => {
            console.log(realties);
            res.render('realties', {
                title: 'Les biens Imoges',
                page_description: "Liste de tous les biens Imoges disponibles",
                topNavActive: 'projects',
                breadcrumb: [
                    {label: 'Accueil', link: '/'},
                    {label: 'Projets', link: '/projects'},
                    {label: 'Biens'}
                ],
                css_paths: [

                ],
                js_paths:[

                ],
                realties: realties
            });
        });
    });
};