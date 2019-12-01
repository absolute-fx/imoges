exports.index = function(req, res) {
    res.render('cg', {
        title: "Aucun projet sur cette page",
        page_description: "Détails sur les conditions générales d'utilisation du site web Imoges",
        topNavActive: '',
        breadcrumb: [
            {label: 'Accueil', link: '/'}
        ]
    });
};