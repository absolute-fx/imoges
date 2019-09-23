const config = require('../config/config');
exports.index = function(req, res, next) {
    res.render('contact', {
        title: 'Contactez Imoges',
        page_description: "Contactez Imoges via notre formulaire en ligne ou directement au " + config.company.phone,
        topNavActive: 'contact',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Contact avant vente'}
        ],
        js_paths:[
            "/javascripts/contact.js"
        ]
    });
};