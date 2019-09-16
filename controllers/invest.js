const Realties = require('../repositories/Realties');
const expenses = {registering_right: 12.5, fees: 1.593, administrative_costs: 950, transcription: 220};

exports.index = function(req, res, next) {
    const status = 0;
    const active = 1;
    const media = 1;
    const limit = 5;
    const order_field ="id";
    const order_direction = "desc";

    Realties.getAll({status, active, media, order_field, order_direction, limit}).then(realties => {
        console.log(realties);
        res.render('invest', {
            title: 'Investir avec Imoges',
            topNavActive: 'invest',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Investir'}
            ],
            css_paths: [

            ],
            js_paths:[

            ],
            realties: realties,
            expenses: expenses
        });
    });

};