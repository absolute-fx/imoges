const Realties = require('../repositories/Realties');
const Librarycategories = require('../repositories/Librarycategories');

exports.index = function(req, res, next) {
    const status = 0;
    const active = 1;
    const media = 1;
    const realtyId = req.query.id;
    const project = 1;

    res.render('realty', {
        title: 'Imoges - Promotion immobilière',
        topNavActive: 'projects',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Projets', link: '/projects'}
        ],
        css_paths: [
            "/javascripts/plugins/slider.revolution/css/extralayers.css",
            "/javascripts/plugins/slider.revolution/css/settings.css"
        ],
        js_paths:[
            "/javascripts/plugins/slider.revolution/js/jquery.themepunch.tools.min.js",
            "/javascripts/plugins/slider.revolution/js/jquery.themepunch.revolution.min.js",
            "/javascripts/home_slider.js"
        ]
    });
};