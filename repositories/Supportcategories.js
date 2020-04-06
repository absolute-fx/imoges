let http;
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
    http = require("http");
}
else
{
    http = require("https");
}
const Promise = require("bluebird");
const fs = require('fs');
let config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;
const axios = require('axios');
const path = require('path');
const root = path.resolve('./public');

class SupportRepository
{
    getAllCategories(data){
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'supportcatgegories');
            axios.get(apiLink + 'supportcategories', {headers: {"x-access-token": data.token}})
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }

    getOne(data){
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'supportcatgegories/' + data.params.catId);
            axios.get(apiLink + 'supportcategories/' + data.params.catId, {headers: {"x-access-token": data.session.token}})
                .then((res) => {
                    res.data.category.root = root;
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }
}
module.exports = new  SupportRepository;