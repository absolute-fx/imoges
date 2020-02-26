const path = require('path');
const root = path.resolve('./public');
const fs = require('fs');
const Tickets = require('../repositories/Tickets');
const moment = require('moment');

// TICKET
exports.setTicket = function(req, res) {
    if(req.files){
        if(Array.isArray(req.files.pictures)){
            // multiple
            const sampleFiles = [... req.files.pictures];
            console.log('multiple');
            uploadFile(sampleFiles, req, res, 'ticket');
        }else{
            // unique
            console.log('unique');
            let dir = root + '/tickets_libraries/' + req.body.realtyId;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            dir = dir + '/' + req.session.user.id;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            req.files.pictures.mv(dir + '/' + req.files.pictures.name, function(err) {
                if (err)
                    return res.status(500).send(err);
                createTicket(req, res);
            });
        }
    }else{
        createTicket(req, res);
    }
};

createTicket = function(req, res){
    console.log(req.body);
    Tickets.createTicket(req).then(data =>{
        console.log(data);
        res.redirect(302, redirectUrl("account/ticket?id=" + data.ticket.id));
    });
};

exports.closeTicket = function(req, res){
    Tickets.closeTicket(req).then(data =>{
        //console.log(data);
        res.redirect("../account/ticket?id=" + data.id);
    });
};

exports.planWo = function(req, res){
    let date = moment(req.query.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    req.query.date_en = date;
    Tickets.planWo(req).then(data =>{
        //console.log(data);
        res.redirect("../account/ticket?id=" + data.id);
    });
};

exports.setWoDone = function(req, res){
    Tickets.setWoDone(req).then(data =>{
        //console.log(data);
        res.redirect("../account/ticket?id=" + data.id);
    });
};

// MESSAGE
exports.setMessage = function(req, res){
    if(req.files){
        if(Array.isArray(req.files.pictures)){
            const sampleFiles = [... req.files.pictures];
            // multiple
            console.log('multiple');
            uploadFile(sampleFiles, req, res, 'message');
        }else{
            // unique
            console.log('unique');
            let dir = root + '/tickets_libraries/' + req.body.realtyId;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            dir = dir + '/' + req.session.user.id;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            req.files.pictures.mv(dir + '/' + req.files.pictures.name, function(err) {
                if (err)
                    return res.status(500).send(err);
                createMessage(req, res);
            });
        }
    }else{
        createMessage(req, res);
    }
};

createMessage = function(req, res){
    Tickets.createMessage(req).then(data =>{
        console.log(data);
        res.redirect("../account/ticket?id=" + data.message.ticketId + "#message-" + data.message.id);
    });
};

// UPLOAD
uploadFile = function(sampleFiles, req, res, type){
    let dir = root + '/tickets_libraries/' + req.body.realtyId;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    dir = dir + '/' + req.session.user.id;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    if(sampleFiles.length > 0){
        sampleFiles[0].mv(dir + '/' + sampleFiles[0].name, function(err) {
            if(err)
                return res.status(500).send(err);
            sampleFiles.shift();
            uploadFile(sampleFiles, req, res, type);
        });
    }else
    {
        switch(type){
            case 'ticket':
                createTicket(req, res);
                break;
            case 'message':
                createMessage(req, res);
                break;
        }

    }
};

// HELPER
function redirectUrl(url){
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
    return  http + "://imoges." + ext + port + "/" + url;
}