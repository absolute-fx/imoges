const axios = require('axios');
const config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;

class TicketsRepository
{
    createTicket(data){
        return new Promise((resolve, reject) => {
            if(data.files){
                if(Array.isArray(data.files.pictures)){
                    data.body.pictures = [];
                    for(let i in data.files.pictures){
                        data.body.pictures.push({name: data.files.pictures[i].name});
                    }
                    console.log(data.body.pictures);
                }else{
                    data.body.pictures = {name: data.files.pictures.name};
                }
            }
            console.log(apiLink + 'tickets');
            axios.post(apiLink + 'tickets', data.body, {headers: {"x-access-token": data.session.token}})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }

    getAllTickets(data){
        return new Promise((resolve, reject) => {
            let domain = data.mainDomain? 'main': 'partner';
            let get = '?role=USER&domain=' + domain;
            if(data.session.isPartner) get = '?role=PARTNER&domain=' + domain + '&partnerId=' + data.session.partner.id;
            if(data.session.isAdmin) get = '?role=ADMIN&domain=' + domain;
            console.log(apiLink + 'tickets'+ get);
            axios.get(apiLink + 'tickets'+ get, {headers: {"x-access-token": data.session.token}})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }

    getTicket(data){
        return new Promise((resolve, reject) => {
            axios.get(apiLink + 'ticket?id=' + data.id, {headers: {"x-access-token": data.token}})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }

    createMessage(data){
        return new Promise((resolve, reject) => {
            if(data.files){
                if(Array.isArray(data.files.pictures)){
                    data.body.pictures = [];
                    for(let i in data.files.pictures){
                        data.body.pictures.push({name: data.files.pictures[i].name});
                    }
                    console.log(data.body.pictures);
                }else{
                    data.body.pictures = {name: data.files.pictures.name};
                }
            }
            console.log(apiLink + 'ticketmessages');
            axios.post(apiLink + 'ticketmessages', data.body, {headers: {"x-access-token": data.session.token}})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }

    closeTicket(data){
        return new Promise((resolve, reject) => {
            axios.put(apiLink + 'ticket/' + data.query.id ,{action:'close'}, {headers: {"x-access-token": data.session.token}})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }

    planWo(data){
        return new Promise((resolve, reject) => {
            axios.put(apiLink + 'ticket/' + data.query.id ,{action:'plan', date:data.query.date_en}, {headers: {"x-access-token": data.session.token}})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }

    setWoDone(data){
        return new Promise((resolve, reject) => {
            axios.put(apiLink + 'ticket/' + data.query.id ,{action:'done'}, {headers: {"x-access-token": data.session.token}})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }
}

module.exports = new TicketsRepository();