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
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error.response.data);
                resolve(error.response.data);
            })
        });
    }

    signup(data){
        data.roles = ['USER'];
        data.username = data.email;
        console.log(data);
        return new Promise((resolve, reject) =>{
            console.log(apiLink + 'auth/signup');
            axios.post(apiLink + 'auth/signup', data)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                console.error(error.response.data);
                resolve(error.response.data);
            })
        });
    }

    validate(data){
        //console.log(data);
        return new Promise((resolve, reject) =>{
            console.log(apiLink + 'users/validate');
            axios.put(apiLink + 'users/validate', {userId : data.userId}, {headers: {"x-access-token": data.token}})
            .then((res) =>{
                resolve(res.data)
            })
            .catch((error) =>{
                console.log(error.response.data);
                resolve(error.response.data);
            })

        });
    }

    validationMail(data){
        return new Promise((resolve, reject) =>{
            axios.post(apiLink + 'auth/validationmail', data)
            .then((res) =>{
                resolve(res.data)
            }).catch((error) =>{
                console.log(error.response.data);
                resolve(error.response.data);
            })

        });
    }

    resetPass(data){
        return new Promise((resolve, reject) => {
            axios.post(apiLink + 'auth/resetPass', data)
            .then((res) =>{
                resolve(res.data)
            }).catch((error) =>{
                console.log(error.response.data);
                resolve(error.response.data);
            });
        });
    }

    savePass(data){
        return new Promise((resolve, reject) =>{
            console.log(apiLink + 'auth/newpass');
            axios.put(apiLink + 'auth/newpass', {password : data.password}, {headers: {"x-access-token": data.token}})
                .then((res) =>{
                    resolve(res.data)
                })
                .catch((error) =>{
                    console.log(error.response.data);
                    resolve(error.response.data);
                })

        });
    }

    verifyToken(data){
        return new Promise((resolve, reject) =>{
            console.log(apiLink + 'auth/verifytoken');
            axios.get(apiLink + 'auth/verifytoken?token=' + data)
                .then((res) =>{
                    resolve(res.data)
                })
                .catch((error) =>{
                    console.log(error.response.data);
                    resolve(error.response.data);
                })

        });
    }
}

module.exports = new AuthRepository();