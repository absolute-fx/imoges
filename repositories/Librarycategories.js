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

class LibrarycategoriesRepository {
    getAll(args){
        return new Promise((resolve, reject) => {
            let data = '?';
            if(args){
                if(args.type){
                    data += "type=" + args.type + "&";
                }
                if(args.orderField){
                    data += "orderField=" + args.orderField + "&";
                }
                if(args.orderDirection){
                    data += "orderDirection=" + args.orderDirection + "&";
                }
            }
            data = data.slice(0, -1);
            console.log(apiLink + 'medias' + data);
            axios.get(apiLink + 'medias' + data)
                .then((res) => {
                    //res.data.root = root;
                    //console.log(res.data);
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error(error.response.data);
                    resolve(error.response.data);
                })
        });
        /*
        let parameters = "";
        let getAllMedia = true;
        let searchBy;
        if(args){
            parameters += "?";
            if(args.cat || args.id){
                getAllMedia = false;
                if(args.cat){
                    searchBy = args.cat;
                }else{
                    searchBy = args.id;
                }
            }
            if(args.param){
                parameters += "library_media_param=" + args.param + "&";
            }
            if(args.libraryMediaExt){
                parameters += "library_media_extension=" + args.libraryMediaExt + "&";
            }
            if(args.userId){
                parameters += "user_id=" + args.userId + "&";
            }
            if(args.orderField){
                parameters += "order_field=" + args.orderField + "&";
            }
            if(args.orderDirection){
                parameters += "order_direction=" + args.orderDirection + "&";
            }
        }
        parameters = parameters.slice(0, -1);

        return new Promise((resolve, reject) => {
            let masterUrl;
            if(getAllMedia){
                masterUrl = apiLink + args.table + '/' + args.tblId + '/librarycategories' + parameters;
            }else{
                masterUrl = apiLink + args.table + '/' + args.tblId + '/librarycategories/' + searchBy + parameters;
            }
            http.get(masterUrl, (resp) =>{
                console.log('getall - repository');
                console.log(masterUrl);
                let data = '';
                resp.on('data', (chunk) =>{
                    data += chunk;
                });
                resp.on('end', () => {
                    let librarycategories = JSON.parse(data).librarycategories;
                    resolve(librarycategories);
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
         */
    }
}
module.exports = new LibrarycategoriesRepository();