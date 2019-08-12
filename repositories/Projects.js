const http = require("http");
const Promise = require("bluebird");
const fs = require('fs');
let config = require('../config/config');
const apiLink = config.ws_settings.coreConfig.api;

class ProjectsRepository
{

    getAll(args){
        let parameters = "";
        if(args){
            parameters += "?";
            if(args.limit){
                parameters += "limit=" + args.limit + "&";
            }
            if(args.active !== undefined){
                parameters += "active=" + args.active + "&";
            }
            if(args.orderField){
                parameters += "order_field=" + args.orderField + "&";
            }
            if(args.orderDirection){
                parameters += "order_direction=" + args.orderDirection + "&";
            }
            if(args.diffused){
                parameters += "diffused=" + args.diffused + "&";
            }
            if(args.media){
                parameters += "media=" + args.media + "&";
            }
        }
        return new Promise((resolve, reject) => {
            console.log(apiLink + 'projects' + parameters);
            http.get(apiLink + 'projects' + parameters, (resp) =>{
                console.log('getall - repository');
                let data = '';
                resp.on('data', (chunk) =>{
                    data += chunk;
                });
                resp.on('end', () => {
                    let projects = JSON.parse(data).projects;
                    resolve(projects);
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
    }

    getOne(args){
        let parameters = "/" + args.projectId;
        parameters += "?";
        if(args.active !== undefined){
            parameters += "active=" + args.active + "&";
        }
        if(args.diffused){
            parameters += "diffused=" + args.diffused + "&";
        }
        if(args.media){
            parameters += "media=" + args.media + "&";
        }
        console.log(parameters);
        return new Promise((resolve, reject) => {
            http.get(apiLink + 'projects' + parameters, (resp) =>{
                console.log('getOne - repository');
                let data = '';
                resp.on('data', (chunk) =>{
                    data += chunk;
                });
                resp.on('end', () => {
                    let project = JSON.parse(data).project;
                    resolve(project);
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
                reject(err);
            });
        });
    }
}

module.exports = new ProjectsRepository();