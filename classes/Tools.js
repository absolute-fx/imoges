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

    static getDocuments(arr){
        let docs = [];
        for(let d of arr){
            for(let doc of d.libraries){
                if(doc.library_media_type === "pdf"){
                    docs.push({library_media_name: doc.library_media_name, library_media_url: doc.library_media_url});
                }
            }
        }
        return docs;
    }

    static getVideos(arr){
        let videos = [];
        for(let v of arr){
            for(let vid of v.libraries){
                if(vid.library_media_type === "youtube"){
                    videos.push({library_media_name: vid.library_media_name, library_media_url: vid.library_media_url});
                }
            }
        }
        return videos;
    }
}
module.exports = Tools;