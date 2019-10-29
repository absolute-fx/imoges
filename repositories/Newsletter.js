const axios = require('axios');
const Promise = require("bluebird");
let config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;

class NewsletterRepository
{
    addSubscriber(email){
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'newsletter' );
            axios.post(apiLink + 'newsletter', {
                email: email
            })
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
    }
}
module.exports = new NewsletterRepository();