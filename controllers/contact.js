exports.index = function(req, res, next) {
    res.render('contact', {
        title: 'Contactez Imoges',
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