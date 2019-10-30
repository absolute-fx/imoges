const axios = require('axios');
const Promise = require("bluebird");
let config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;

class ContactformRepository
{
    sendMessage(data){
        console.log(data);

        /*
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'contact' );
            axios.post(apiLink + 'contact', data)
                .then((res) => {
                    console.log(`statusCode: ${res.statusCode}`);
                    console.log(res);
                    resolve(res);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                })
        });
        */
    }
}
module.exports = new ContactformRepository();