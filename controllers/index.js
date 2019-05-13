exports.index = function(req, res, next) {
    res.render('index', {
        title: 'Imoges - Promotion immobilière',
        type: 'root',
        css_paths: [
            "/javascripts/plugins/slider.revolution/css/extralayers.css",
            "/javascripts/plugins/slider.revolution/css/settings.css"
        ],
        js_paths:[
            "/javascripts/plugins/slider.revolution/js/jquery.themepunch.tools.min.js",
            "/javascripts/plugins/slider.revolution/js/jquery.themepunch.revolution.min.js",
            "/javascripts/home_slider.js"
        ],
        topNavActive: 'index',
        logs: [
            { log_table_id: 25, label: 'Résidence Morgane', log_table_name: 'Projects', createdAt: '12/04/2018'},
            { log_table_id: 30, log_table_id_parent: 64, label: 'App 14', label_parent: 'Les demoiselles', log_table_name: 'Realties',createdAt: '12/04/2018'},
            { log_table_id: 22, log_table_id_parent: 64, label: 'App 09', label_parent: 'Les demoiselles', log_table_name: 'Clients', createdAt: '10/04/2018'},
            { log_table_id: 12, log_table_id_parent: 64, label: 'App 05', label_parent: 'Les demoiselles', log_table_name: 'Realties', createdAt: '08/04/2018'},
            { log_table_id: 64, label: 'Les demoiselles', log_table_name: 'Projects', createdAt: '05/04/2018'},
            { log_table_id: 27, log_table_id_parent: 10, label: 'Rez 04', label_parent: 'Ines', log_table_name: 'Clients', createdAt: '02/04/2018'}
        ],
        catalog_headlines:[
            {},
            {},
            {},
            {}
        ]
    });
};