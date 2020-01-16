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
            title: "Demande d'intervention",
            topNavActive: 'account',
            sideNavActive: 'sav',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Mon compte', link: '/account'},
                {label: 'Demande d\'intervention'}
            ],
            js_paths: ['/javascripts/sav.js'],
            realties: user.realties
        });
    });
};


exports.getAllTickets = function(req, res){
    Tickets.getAllTickets(req).then(tickets =>{
        console.log(tickets);

        for(let i in tickets){
            tickets[i].ref = moment(tickets[i].createdAt).format('YYYY') + '-' + moment(tickets[i].createdAt).format('MM') + '-' + tickets[i].realtyId + '-' + tickets[i].id ;
            tickets[i].statusLabel = setStatus(tickets[i].status);
        }

        res.render('accounttickets', {
            title: 'Mes tickets',
            topNavActive: 'account',
            sideNavActive: 'tickets',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Mon compte', link: '/account'},
                {label: 'Mes tickets'}
            ],
            js_paths: [],
            tickets: tickets
        });
    });
};

exports.getTicket = function(req, res){
    Tickets.getTicket({id: req.query.id, token: req.session.token}).then(data =>{
        moment.lang("fr");
        data.ticket.ref = moment(data.ticket.createdAt).format('YYYY') + '-' + moment(data.ticket.createdAt).format('MM') + '-' + data.ticket.realtyId + '-' + data.ticket.id ;
        data.ticket.startDate = moment(data.ticket.createdAt).format('dddd') + " " + moment(data.ticket.createdAt).format('DD/MM/YYYY à HH[h]mm');
        if(data.ticket.status === 3 || data.ticket.status === 4){
            data.ticket.closeDate = moment(data.ticket.updatedAt).format('dddd') + " " + moment(data.ticket.updatedAt).format('DD/MM/YYYY à HH[h]mm');
        }
        data.ticket.fromNow = moment(data.ticket.createdAt).fromNow();
        data.ticket.statusLabel = setStatus(data.ticket.status);
        data.ticket.priorityLabel = setPriority(data.ticket.priority);
        const now = moment();
        if( data.ticket.realty.realty_reception_date){
            const fromNow = now.diff(moment(data.ticket.realty.realty_reception_date), 'months');
             if(fromNow > parseInt(data.ticket.realty.realty_warranty)){
                 data.ticket.realty.warranty = false;
             }else{
                 data.ticket.realty.warranty = true;
             }

        }

        if(data.ticket.planned){
            data.ticket.plannedDate = moment(data.ticket.planned).format('dddd') + " " + moment(data.ticket.planned).format('DD/MM/YYYY');
        }
        for(let i in data.ticket.ticketmessages){
            data.ticket.ticketmessages[i].fromNow = moment(data.ticket.ticketmessages[i].createdAt).fromNow();
            if(data.ticket.ticketmessages[i].librarycategories[0]){
                if (data.ticket.ticketmessages[i].librarycategories[0].libraries.length <= 4){
                    data.ticket.ticketmessages[i].imgCount = data.ticket.ticketmessages[i].librarycategories[0].libraries.length;
                }else{
                    data.ticket.ticketmessages[i].imgCount = 4
                }
            }
        }

        console.log(data.ticket);
        res.render('ticket', {
            title: 'Ticket ' + data.ticket.ref,
            topNavActive: 'account',
            sideNavActive: 'tickets',
            breadcrumb: [
                {label: 'Accueil', link: '/'},
                {label: 'Mon compte', link: '/account'},
                {label: 'Mes tickets', link: '/account/tickets'},
                {label: 'Ticket ' + data.ticket.ref},
            ],
            js_paths: ['/javascripts/ticket.js'],
            ticket: data.ticket
        });
    });
};

function setStatus(status){
    let namedStatus;

    switch(status){
        case 0:
            namedStatus = 'En attente';
            break;
        case 1:
            namedStatus = 'Prestation planifiée';
            break;
        case 2:
            namedStatus = 'Prestation effectuée';
            break;
        case 3:
            namedStatus = 'Fermé';
            break;
        case 4:
            namedStatus = 'Annulé';
            break;
    }

    return namedStatus
}

function setPriority(priority){
    let namedPriority;
    switch(priority){
        case 0:
            namedPriority = 'Pas urgent';
            break;
        case 1:
            namedPriority = 'Urgent';
            break;
        case 2:
            namedPriority = 'Très urgent';
            break;
    }
    return namedPriority;
}
