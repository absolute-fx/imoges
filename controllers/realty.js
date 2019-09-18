
exports.index = function(req, res, next) {
    res.render('realty', {
        title: 'Imoges - Promotion immobilière',
        topNavActive: 'projects',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Projets', link: '/projects'},
            {label: realty.project.project_title, link: '/project?id=' + realty.projectId},
            {label: realty.realty_title}
        ],
        css_paths: [
            "/javascripts/plugins/slider.revolution/css/extralayers.css",
            "/javascripts/plugins/slider.revolution/css/settings.css"
        ],
        js_paths:[
            "/javascripts/plugins/slider.revolution/js/jquery.themepunch.tools.min.js",
            "/javascripts/plugins/slider.revolution/js/jquery.themepunch.revolution.min.js",
            "/javascripts/home_slider.js"
        ]
    });
};