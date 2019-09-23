const Realties = require('../repositories/Realties');

exports.index = function(req, res, next) {
    const status = 0;
    const active = 1;
    const media = 1;
    const order_field ="id";
    const order_direction = "desc";

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

};