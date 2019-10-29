const Newsletter = require("../repositories/Newsletter");

exports.index = function(req, res, next) {
    Newsletter.addSubscriber(req.query.email).then( data => {
        res.send(req.query.email);
    });
};