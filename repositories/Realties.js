const http = require("http");
const Promise = require("bluebird");
const fs = require('fs');
let config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;

class RealtiesRepository
{
    getAll(args){
        let parameters = "";
        if(args){
            parameters += "?";
            if(args.limit){
                parameters += "limit=" + args.limit + "&";
            }
            if(args.status !== undefined){
                parameters += "status=" + args.status + "&";
            }
            if(args.active !== undefined){
                parameters += "active=" + args.active + "&";
            }
            if(args.order_field){
                parameters += "order_field=" + args.order_field + "&";
            }
            if(args.order_direction){
                parameters += "order_direction=" + args.order_direction + "&";
            }
            if(args.media !== undefined){
                parameters += "media=" + args.media + "&";
            }
            if(args.star !== undefined){
                parameters += "star=" + args.star + "&";
            }
        }
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'realties' + parameters);
            http.get(apiLink + 'realties' + parameters, (resp) =>{
                console.log('getall - realties repository');
                let data = '';
                resp.on('data', (chunk) =>{
                    data += chunk;
                });
                resp.on('end', () => {
                    let realties = JSON.parse(data).realties;
                    resolve(realties);
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
    }

    getByProject(args){
        let parameters = "";
        if(args){
            parameters += "?";
            if(args.limit){
                parameters += "limit=" + args.limit + "&";
            }
            if(args.status !== undefined){
                parameters += "status=" + args.status + "&";
            }
            if(args.active !== undefined){
                parameters += "active=" + args.active + "&";
            }
            if(args.order_field){
                parameters += "order_field=" + args.order_field + "&";
            }
            if(args.order_direction){
                parameters += "order_direction=" + args.order_direction + "&";
            }
            if(args.media !== undefined){
                parameters += "media=" + args.media + "&";
            }
            if(args.star !== undefined){
                parameters += "star=" + args.star + "&";
            }

        }
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'projects/' + args.projectId + '/realties'  + parameters);
            http.get(apiLink + 'projects/' + args.projectId + '/realties'  + parameters, (resp) =>{
                console.log('getByProject - realties repository');
                let data = '';
                resp.on('data', (chunk) =>{
                    data += chunk;
                });
                resp.on('end', () => {
                    let realties = JSON.parse(data).realties;
                    resolve(realties);
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
    }

    getOne(args){
        let parameters = "";
        if(args){
            parameters += "?";
            if(args.status !== undefined){
                parameters += "status=" + args.status + "&";
            }
            if(args.active !== undefined){
                parameters += "active=" + args.active + "&";
            }
            if(args.media !== undefined){
                parameters += "media=" + args.media + "&";
            }
            if(args.project !== undefined){
                parameters += "project=" + args.project + "&";
            }
        }
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'realties/' + args.realtyId + "" + parameters);
            http.get(apiLink + 'realties/' + args.realtyId + "" + parameters, (resp) =>{
                console.log('getOne- realties repository');
                let data = '';
                resp.on('data', (chunk) =>{
                    data += chunk;
                });
                resp.on('end', () => {
                    let realty = JSON.parse(data).realty;
                    resolve(realty);
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
    }
}

module.exports = new RealtiesRepository();