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
            if(args.countonly){
                parameters += "countonly=" + args.countonly + "&";
            }
            if(args.realties){
                parameters += "realties=" + args.realties + "&";
            }
            if(args.realtiesCount){
                parameters += "realtiesCount=" + args.realtiesCount + "&";
            }

            parameters = parameters.slice(0, -1);
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
                    if(!args.countonly){
                        let projects = JSON.parse(data).projects;
                        resolve(projects);
                    }else{
                       let totalProjects = JSON.parse(data).totalProjects;
                        resolve(totalProjects);
                    }
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
        parameters = parameters.slice(0, -1);
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