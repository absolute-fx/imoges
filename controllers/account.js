const Users = require('../repositories/Users');
const Tickets = require('../repositories/Tickets');
const moment = require('moment');


exports.index = function(req, res) {
    res.render('account', {
        title: 'Espace client',
        topNavActive: 'account',
        breadcrumb: [
            {label: 'Accueil', link: '/'},
            {label: 'Mon compte'}
        ],
        css_paths: [

        ],
        js_paths:[

        ],
        user: req.session.user
    });
};

exports.userData = function (req, res) {
    Users.userData({id: req.session.user.id, token: req.session.token}).then( user => {
        console.log(user);
        res.render('userdata', {
            title: 'Données utilisateur',
            topNavActive: 'account',
            sideNavActive: 'user',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Mon compte', link: '/account'},
                {label: 'Mes données'}
            ],
            js_paths:[
                '../javascripts/update-user-infos.js'
            ],
            user: user
        });
    });
};

exports.updateUser = function(req, res){
    let data = req.body;
    data.token = req.session.token;
    data.userId = req.session.user.id;
    Users.updateUser(data).then( user => {
        console.log(data);
        res.send(user);
    });
};

exports.realtiesList = function(req, res){
    Users.userRealties({id: req.session.user.id, token: req.session.token}).then( user => {
        for (const i in user.realties){
            if(user.realties[i].realty_reception_date){
                const now = moment();
                user.realties[i].months_from_reception = now.diff(moment(user.realties[i].realty_reception_date), 'months');
                user.realties[i].realty_reception_date = moment(user.realties[i].realty_reception_date).format('DD/MM/YYYY');
            }else{
                user.realties[i].months_from_reception = 0;
            }
        }
        console.log(user.realties);
        res.render('accountrealties', {
            title: 'Liste des mes biens',
            topNavActive: 'account',
            sideNavActive: 'realties',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Mon compte', link: '/account'},
                {label: 'Mes biens'}
            ],
            js_paths: [],
            realties: user.realties
        });
    });
};

exports.afterSale = function (req, res) {
    Users.userRealties({id: req.session.user.id, token: req.session.token}).then( user => {
        console.log();
        for (const i in user.realties){
            if(user.realties[i].realty_reception_date){
                const now = moment();
                user.realties[i].months_from_reception = now.diff(moment(user.realties[i].realty_reception_date), 'months');
                user.realties[i].realty_reception_date = moment(user.realties[i].realty_reception_date).format('DD/MM/YYYY');
            }else{
                user.realties[i].months_from_reception = 0;
            }
        }
        console.log(user.realties);
        res.render('accountsav', {
            title: 'Mon SAV',
            topNavActive: 'account',
            sideNavActive: 'sav',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Mon compte', link: '/account'},
                {label: 'Mon SAV'}
            ],
            js_paths: ['/javascripts/sav.js'],
            realties: user.realties
        });
    });
};

exports.getTicket = function(req, res){
    Tickets.getTicket({id: req.query.id, token: req.session.token}).then(data =>{
        moment.lang("fr");
        data.ticket.ref = moment(data.ticket.createdAt).format('YYYY') + '-' + moment(data.ticket.createdAt).format('MM') + '-' + data.ticket.realtyId + '-' + data.ticket.id ;
        data.ticket.startDate = moment(data.ticket.createdAt).format('dddd') + " " + moment(data.ticket.createdAt).format('DD/MM/YYYY à HH[h]mm');
        data.ticket.fromNow = moment(data.ticket.createdAt).fromNow();
        console.log(data.ticket);
        res.render('ticket', {
            title: 'Ticket ' + data.ticket.ref,
            topNavActive: 'account',
            sideNavActive: 'sav',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Mon compte', link: '/account'},
                {label: 'Mon SAV', link: '/account/sav'},
                {label: 'Ticket ' + data.ticket.ref},
            ],
            js_paths: [],
            ticket: data.ticket
        });
    });
};