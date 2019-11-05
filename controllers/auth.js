const Auth = require("../repositories/Auth");

exports.index = function(req, res, next) {
    //console.log(req.body);

    Auth.singin(req.body).then( data => {
        console.log("Data sent");
        res.send(data);
    });

};