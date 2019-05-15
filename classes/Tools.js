class Tools{

    // ** GENERAL ** //

    // convert date
    static convertDate(d) {
        const date = new Date(d);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    // add dot on number
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // ** PROJECT ** //

    // get lower and higher price
    static getPriceRange(arr, priceWithVat)
    {
        let lowerPrice, response;
        let higherPrice = 0;
        for(let realty of arr){
            let price = realty.realty_net_price;
            if(priceWithVat) {
                price += price * (realty.realty_vat / 100);
            }
            if(price > higherPrice){
                higherPrice = price;
            }
            if(lowerPrice && price < lowerPrice){
                lowerPrice = price;
            } else if(!lowerPrice){
                lowerPrice = price;
            }
        }
        response = priceWithVat ? "Entre <strong>" + this.numberWithCommas(lowerPrice) + "€</strong> et <strong>" + this.numberWithCommas(higherPrice) + "€</strong> tvac": "Entre <strong>" + this.numberWithCommas(lowerPrice) + "€</strong> et <strong>" + this.numberWithCommas(higherPrice) + "€</strong> htva";
        return response
    }

    static getMedium(arr, type){
        let medium = [];
        for(let m of arr){
            for(let media of m.libraries){
                if(media.library_media_type === type){
                    medium.push({library_media_name: media.library_media_name, library_media_url: media.library_media_url});
                }
            }
        }
        return medium;
    }
}
module.exports = Tools;