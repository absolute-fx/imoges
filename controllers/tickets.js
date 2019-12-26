const path = require('path');
const root = path.resolve('./public');
const fs = require('fs');
const Tickets = require('../repositories/Tickets');


exports.setTicket = function(req, res) {
    if(req.files){
        const sampleFiles = [... req.files.pictures];
        if(Array.isArray(req.files.pictures)){
            // multiple
            console.log('multiple');
            uploadFile(sampleFiles, req, res);
        }else{
            // unique
            console.log('unique');
            let dir = root + '/tickets_libraries/' + req.session.user.id;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            dir = dir + '/' + req.body.realtyId;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            sampleFiles.mv(dir + '/' + req.files.pictures.name, function(err) {
                if (err)
                    return res.status(500).send(err);
                //res.send('File uploaded!');
                createTicket(req, res);
            });
        }
    }else{
        createTicket(req, res);
    }
};

uploadFile = function(sampleFiles, req, res){
    let dir = root + '/tickets_libraries/' + req.session.user.id;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    dir = dir + '/' + req.body.realtyId;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    if(sampleFiles.length > 0){
        sampleFiles[0].mv(dir + '/' + sampleFiles[0].name, function(err) {
            if(err)
                return res.status(500).send(err);
            sampleFiles.shift();
            uploadFile(sampleFiles, req, res);
        });
    }else
    {
        createTicket(req, res);
    }
};

createTicket = function(req, res){
    console.log(req.body);
    Tickets.createTicket(req).then(ticket =>{
        console.log(ticket);
        let ext, http, port;
        if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
            ext = 'loc';
            http = 'http';
            port = ':3000'
        }else{
            ext = 'be';
            http = 'https';
            port ='';
        }
        res.redirect(302, http + "://imoges." + ext + port + "/account");
    });
};