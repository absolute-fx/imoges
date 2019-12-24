const path = require('path');
const root = path.resolve('./public');
const fs = require('fs');
const Tickets = require('../repositories/Tickets');


exports.setTicket = function(req, res) {
    const sampleFiles = req.files.pictures;
    console.log(req.files.pictures);
    if(Array.isArray(req.files.pictures)){
        // multiple
        console.log('multiple');
        uploadFile(sampleFiles, req, res);
    }else{
        // unique
        console.log('unique');
        sampleFiles.mv(root + '/tickets_libraries/' + req.files.pictures.name, function(err) {
            if (err)
                return res.status(500).send(err);
            res.send('File uploaded!');
        });
    }
};

uploadFile = function(sampleFiles, req, res){
    let dir = root + '/tickets_libraries/' + req.session.user.id;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    dir = dir + '/' + req.body.realty;
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
    /*
    Tickets.createTicket(req).then(ticket =>{

    });
    */
};