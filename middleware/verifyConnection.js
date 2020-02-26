verifyConnection = (req, res, next) => {
    let ext, http, port, subdomain;
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
        ext = 'loc';
        http = 'http';
        port = ':3000'
    }else{
        ext = 'be';
        http = 'https';
        port ='';
    }
    subdomain = req.mainDomain ? '' : 'partners.';
    if(req.session.token){
        if(!req.session.user.validated){
            res.redirect(302, http + "://" + subdomain + "imoges." + ext + port + "/auth/notvalidated");
        }else{
            req.session.user.roles.forEach((role)=>{
                req.isAdmin = role.name === 'ADMIN';
                req.isPArtner = role.name === 'PARTNER';
            });
            req.connected = true;
            next();
        }
    }else{
        res.redirect(302, http + "://" + subdomain + "imoges." + ext + port + "/login");
    }
};

module.exports = verifyConnection;