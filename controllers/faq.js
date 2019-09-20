exports.index = function(req, res, next) {
    res.render('faq', {
        title: 'Questions fréquentes',
        topNavActive: 'contact',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Questions fréquentes'}
        ]
    });
};