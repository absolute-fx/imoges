const Realties = require('../repositories/Realties');
const Librarycategories = require('../repositories/Librarycategories');

exports.index = function(req, res, next) {
    const status = 0;
    const active = 1;
    const media = 1;
    const realtyId = req.query.id;
    const project = 1;

    res.render('realty', {
        title: 'Imoges - Promotion immobilière',
        topNavActive: 'projects',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Projets', link: '/projects'}
        ]
    });
};