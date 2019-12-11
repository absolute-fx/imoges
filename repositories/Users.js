const axios = require('axios');
const config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;

class UsersRepository
{
    userData(data){
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'users/' + data.id);
            axios.get(apiLink + 'users/' + data.id, {headers: {"x-access-token": data.token}})
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error.response.data);
                resolve(error.response.data);
            })
        });
    }

    updateUser(data){
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'users/' + data.userId);
            axios.put(apiLink + 'users/' + data.userId, data, {headers: {"x-access-token": data.token}})
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

module.exports = new UsersRepository();