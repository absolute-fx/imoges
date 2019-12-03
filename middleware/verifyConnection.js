verifyConnection = (req, res, next) => {
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
    if(req.session.token){
        if(!req.session.user.validated){
            res.redirect(302, http + "://imoges." + ext + port + "/auth/notvalidated");
        }
    }else{
        res.redirect(302, http + "://imoges." + ext + port + "/login");
    }
    next();
};

module.exports = verifyConnection;