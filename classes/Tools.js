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

    // get medium type = pdf, youtube, sketchfab
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

    // ** PROJECT ** //

    // get lower and higher price
    static getPriceRange(arr, priceWithVat)
    {
        let lowerPrice;
        let response = "";
        let higherPrice = 0;
        const lastOne = this.getAvailableRealtiesNbr(arr) === 1;
        for(let realty of arr){
            if(realty.clients.length === 0) {
                let price = realty.realty_net_price;
                if (priceWithVat) {
                    price += price * (realty.realty_vat / 100);
                }
                if (price > higherPrice) {
                    higherPrice = price;
                }
                if (lowerPrice && price < lowerPrice) {
                    lowerPrice = price;
                } else if (!lowerPrice) {
                    lowerPrice = price;
                }
            }
        }
        if(!lastOne && lowerPrice !== higherPrice){
            response = priceWithVat ? "Entre <strong>" + this.numberWithCommas(lowerPrice) + "€</strong> et <strong>" + this.numberWithCommas(higherPrice) + "€</strong> tvac": "Entre <strong>" + this.numberWithCommas(lowerPrice) + "€</strong> et <strong>" + this.numberWithCommas(higherPrice) + "€</strong> htva";
        } else if(!lastOne && lowerPrice === higherPrice){
            response = priceWithVat ? "<strong>" + this.numberWithCommas(higherPrice) + "€ </strong> tvac": "<strong>" + this.numberWithCommas(higherPrice) + "€ </strong> htva";
        } else if(lastOne){
            response = priceWithVat ? "<strong>" + this.numberWithCommas(higherPrice) + "€ </strong> tvac": "<strong>" + this.numberWithCommas(higherPrice) + "€ </strong> htva";
        }
        return response
    }

    // ** BIENS ** //
    static getRelatyPrice(price, vat,  priceWithVat){
        return priceWithVat ? this.numberWithCommas(price + (price * (vat / 100))) : this.numberWithCommas(price);
    }

    static getRealtySortDetails(arr){
        let floorList = [];
        let gardenList = [];
        for(let r of arr){
            if(r.realty_floor >= 0){
                if(!searchIfExist(r.realty_floor, floorList)){
                    let cl = "floor-" + r.realty_floor;
                    let label = "Etage " + r.realty_floor;
                    if(r.realty_floor === 0) label = "Rez";
                    floorList.push({cl:cl, label: label, raw: r.realty_floor});
                }
            }
            if(r.realty_garden_surface && r.realty_garden_surface > 0){
                if(!searchIfExist("garden", gardenList)){
                    gardenList.push({cl: "garden", label: "Avec jardin", raw: "garden"});
                }
            }
        }
        let sortList =  floorList.concat(gardenList);
        return sortList;
    }

    static getSortClass(realty){
        let classes = [];
        if(realty.realty_status < 1) classes.push("vacant");
        if(realty.realty_floor >= 0 )classes.push("floor-" + realty.realty_floor);
        if(realty.realty_garden_surface > 0) classes.push("garden");
        return classes;
    }

    static getAvailableRealtiesNbr(realties){
        let counter = 0;
        for(let r of realties){
            if(r.clients.length === 0) counter++;
        }
        return counter;
    }
}
module.exports = Tools;

function searchIfExist(data, sortList){
    let found = false;
    for(let sL of sortList){
        if(data === sL.raw){
            found =  true;
            break;
        }
    }
    return found;
}