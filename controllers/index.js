const Realties = require('../repositories/Realties');
const Projects = require('../repositories/Projects');
const Tickets = require('../repositories/Tickets');
let Account = require('../controllers/account');
const moment = require('moment');
const Tools = require('../classes/Tools');

exports.index = function(req, res, next) {
    const limit = 2;
    const status = 0;
    const active = 1;
    const media = 1;
    const orderField = "id";
    const orderDirection = "desc";
    const realties = 1;
    if(req.mainDomain){
        Projects.getAll({limit, status, active, media, orderField, orderDirection, realties}).then(projects =>{
            let p = Tools.getRealtiesAvailability(projects);
            res.render('index', {
                title: 'Imoges - Promotion immobilière depuis 2006',
                page_description: "La société Imoges a été fondée en  2006 et a actuellement porté une série de projets immobiliers sur Ecaussinnes, Soignies et Braine le Comte.",
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
                projects: p
            });

        });

    }else{
        if(req.session.token){
            // Partner dashboard
            //console.log(req.session);
            Tickets.getAllTickets(req).then(tickets =>{
                tickets.forEach((ticket)=>{
                    ticket.date = moment(ticket.createdAt).format('DD/MM/YYYY');
                    switch (ticket.status){
                        case 0:
                            ticket.statusLabel = "En attente";
                            break;
                        case 1:
                            ticket.statusLabel = "Prestation planifiée";
                            ticket.plannedDate = moment(ticket.planned).format('DD/MM/YYYY');
                            break;
                        case 2:
                            ticket.statusLabel = "Prestation effectuée";
                            break;
                    }
                });

                res.render('partner_index', {
                    type: 'root',
                    css_paths: [

                    ],
                    js_paths:[
                        '/javascripts/ticket.js'
                    ],
                    topNavActive: 'home',
                    isAdmin: req.isAdmin,
                    isPartner: req.isPartner,
                    tickets: tickets
                });
            });
        }else{
            res.render('partner_login', {
                type: 'root',
                css_paths: [

                ],
                js_paths:[
                    "/javascripts/auth_partner.js"
                ]
            });
        }

    }
};