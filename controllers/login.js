const Realties = require('../repositories/Realties');
const expenses = {registering_right: 12.5, fees: 1.593, administrative_costs: 950, transcription: 220};

exports.index = function(req, res, next) {

    res.render('login', {
        title: 'Espace client',
        topNavActive: 'login',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Connection'}
        ],
        css_paths: [

        ],
        js_paths:[

        ]
    });

};