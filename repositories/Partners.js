let http;
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
    http = require("http");
}
else
{
    http = require("https");
}
const axios = require('axios');
const Promise = require("bluebird");
const fs = require('fs');
let config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;

class PartnersRepository
{
    getAll(args){

    }

    getOne(id){
        return new Promise((resolve, reject) => {
            axios.get(apiLink + 'partner/'+ id).then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error.response.data);
                resolve(error.response.data);
            })
        });
    }
}
module.exports = new PartnersRepository();