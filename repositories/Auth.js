const axios = require('axios');
const Promise = require("bluebird");
const config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;

class AuthRepository
{
    singin(data){
        console.log(data);

        return new Promise((resolve, reject) => {
            console.log(apiLink + 'auth/signin' );
            axios.post(apiLink + 'auth/signin', data)
                .then((res) => {
                    //console.log(`statusCode: ${res.statusCode}`);
                    //console.log(res);
                    resolve(true);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                })
        });
    }
}
module.exports = new AuthRepository();