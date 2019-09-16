exports.index = function(req, res, next) {
    res.render('sav', {
        title: 'Service après Imoges',
        topNavActive: 'sav',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Service après vente'}
        ],
        js_paths:[
        ]
    });
};