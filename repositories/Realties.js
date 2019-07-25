const http = require("http");
const Promise = require("bluebird");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("./config/config.json"));
const apiLink = config.ws_settings.coreConfig.api;

class RealtiesRepository
{

    getAll(args){
        let getLink = "";
        if(args){
            getLink += "?";
            if(args.limit){
                getLink += "limit=" + args.limit + "&";
            }
            if(args.status !== undefined){
                getLink += "status=" + args.status + "&";
            }
            if(args.active !== undefined){
                getLink += "active=" + args.active + "&";
            }
            //console.log(apiLink + 'realties/getall' + getLink);
        }
        return new Promise((resolve, reject) => {
            http.get(apiLink + 'realties/getall' + getLink, (resp) =>{
                console.log('getall - repository');
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

    getRealtiesByProject(projectId){

    }
}

module.exports = new RealtiesRepository();