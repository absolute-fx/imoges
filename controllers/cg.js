exports.index = function(req, res) {
    res.render('cg', {
        title: "Conditions générales",
        page_description: "Détails sur les conditions générales d'utilisation du site web Imoges",
        topNavActive: '',
        breadcrumb: [
            {label: 'Accueil', link: '/'}
        ]
    });
};