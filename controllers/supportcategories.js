const Supportcategories = require('../repositories/Supportcategories');

exports.getOne = (req, res)=>{
    const id = req.params.catId;
    Supportcategories.getOne(req).then(data =>{
        res.send({category: data.category});
    });
};