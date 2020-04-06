const Faqs = require('../repositories/Faqs');

exports.index = function(req, res) {
    if(req.body.terms !== ''){
        Faqs.search({terms: req.body.terms, token: req.session.token}).then(faqs =>{
            res.send(faqs);
        });
    }else{

    }
};