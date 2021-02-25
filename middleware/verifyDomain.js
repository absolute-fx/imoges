verifyDomain  = (req, res, next) => {
    const domain = req.vhost.hostname;
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
        if(domain === 'imoges.loc'){
            req.mainDomain = true;
        }else if(domain === 'partners.imoges.loc'){
            req.mainDomain = false;
        }
    }else{
        if(domain === 'imoges.be'){
            req.mainDomain = true;
        }else if(domain === 'partners.imoges.be'){
            req.mainDomain = false;
        }else if(domain === 'http://imoges.alwaysdata.net/'){
            req.mainDomain = true;
        }
    }
    console.log('DOMAIN: ' , domain);
    next();
};

module.exports = verifyDomain;