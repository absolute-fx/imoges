exports.index = function(req, res, next) {
    res.render('terms', {
        title: 'Conditions générales',
        topNavActive: 'company',
        sideNavActive: 'terms',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Imoges', link: '/company'},
            {label: 'Conditions générales'}
        ]
    });
};