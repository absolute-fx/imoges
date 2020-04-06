const axios = require('axios');
const Promise = require("bluebird");
const config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;
const path = require('path');
const root = path.resolve('./public');

class FaqsRepository
{
    search(data){
        return new Promise((resolve, reject) =>{
            console.log(apiLink + 'faqs?terms=' + data.terms);
            axios.get(apiLink + 'faqs?terms=' + data.terms, {headers: {"x-access-token": data.token}})
                .then((res) => {
                    res.data.root = root;
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
    }
}
module.exports = new FaqsRepository();