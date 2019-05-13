exports.index = function(req, res, next) {
    res.render('history', {
        title: 'Historique de la société)',
        topNavActive: 'company',
        sideNavActive: 'history',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Imoges', link: '/company'},
            {label: 'Historique'}
        ],
        history: [
            {date: "Novembre 2019", project_title: "Les demoiselles", label: "Fin de chantier", project_id: 50},
            {date: "Janvier 2019", project_title: "5 appartements rue J.Jaures", label: "Fin de chantier", project_id: 42},
            {date: "Août 2008", project_title: "Les demoiselles", label: "Début de chantier", project_id: 50}
        ]
    });
}