exports.index = function(req, res) {
    res.render('cg', {
        title: "Aucun projet sur cette page",
        topNavActive: '',
        breadcrumb: [
            {label: 'Accueil', link: '/'}
        ]
    });
};