const Auth = require("../repositories/Auth");

exports.index = function(req, res, next) {

    Auth.singin(req.body).then( data => {
        console.log("Data sent");
        if(data.auth){
            req.session.token = data.accessToken;
            req.session.user = data.user;
            console.log(req.session);
            res.send(data);
        } else{
            res.send(data);
        }
    });
};