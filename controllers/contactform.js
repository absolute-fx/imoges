const Contactform = require("../repositories/Contactform");

exports.index = function(req, res, next) {
    //console.log(req.body);

    Contactform.sendMessage(req.body).then( data => {
        console.log("Data sent");
        res.send(data);
    });

};