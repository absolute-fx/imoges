exports.index = function(req, res, next) {
    res.render('company', {
        title: 'La sprl IMOGES',
        topNavActive: 'company',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Imoges'}
        ]
    });
};