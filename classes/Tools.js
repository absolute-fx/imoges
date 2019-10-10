class Tools{

    // ** GENERAL ** //

    // convert date
    static convertDate(d) {
        const date = new Date(d);
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }

    // history Date
    static  historyDate(d){
        const date = new Date(d);
        const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        return months[date.getMonth()] + " " + date.getFullYear();
    }

    // add dot on number
    static numberWithCommas(x) {
        x = parseInt(x);
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // get medium type = pdf, youtube, sketchfab
    static getMedium(arr, type){
        let medium = [];
        for(let m of arr){
            for(let media of m.libraries){
                if(media.library_media_extension === type){
                    medium.push({library_media_name: media.library_media_name, library_media_url: media.library_media_url});
                }
            }
        }
        return medium;
    }

    static getGenericImages(librarycategories){
        let genericImages = [];
        for(let lC of librarycategories){
            if(lC.library_category_label === "generic"){
                for(let l of lC.libraries){
                    if(l.library_media_extension === "jpg"){
                        genericImages.push(l);
                    }
                }
            }
        }
        /*
        if(genericImages.length === 0){
            genericImages = [{library_media_name: "no-media.jpg", library_media_extension: "jpg"}];
        }
        */
        return genericImages;
    }

    static getProjectSlideShow(librarycategories){
        let slideshow = [];
        for(let sL of librarycategories){
            if(sL.library_category_label === "slideshow"){
                for(let l of sL.libraries){
                    if(l.library_media_extension === "jpg"){
                        slideshow.push(l);
                    }
                }
            }
        }
        return slideshow;
    }

    static getImagesFromCat(librarycategories){
        let categories = [];
        for(let lC of librarycategories){
            let images = [];
            if(lC.library_category_label !== "default" && lC.library_category_label !== "generic" && lC.library_category_label !== "slideshow" && lC.library_category_label !== "youtube" && lC.libraries.length > 0){
                categories.push(lC);
                for(let l of lC.libraries){
                    if(l.library_media_extension === "jpg"){
                        images.push(l);
                    }
                }
                lC.images = images;
            }
        }
        return categories;
    }

    static getRealtyImages(librarycategories){
        let images = [];
        for(let lC of librarycategories){
            for(let l of lC.libraries) {
                if (l.library_media_extension === "jpg" && l.library_media_param !== "localisation") {
                    images.push(l);
                }
            }
        }
        //console.log("IMAGES " + images.length)
        return images;
    }

    static getRealtySlideMedia(librarycategories){
        let images = [];
        for(let lC of librarycategories){
            for(let l of lC.libraries) {
                if (l.library_media_extension === "jpg" && l.library_media_param === "slideshow") {
                    images.push(l);
                }
            }
        }
        return images;
    }

    static getYoutubeVid(librarycategories){
        let videos = [];
        for(let lC of librarycategories){
            if(lC.library_category_label === "youtube"){
                for(let l of lC.libraries){
                    videos.push(l);
                }
            }
        }
        return videos
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
            if(realty.realty_status === 0) {
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

    static setPeb(peb){
        let pebType;
        switch(peb){
            case 1:
               pebType = "A++";
               break;
            case 2:
                pebType = "A+";
                break;
            case 3:
                pebType = "A";
                break;
        }
        return pebType;
    }

    static getRealtiesAvailability(projects){
        let realtiesAvailableList;
        let realtiesList;
        let totalRealties;
        let totalRealtiesAvailable;
        for(let p of projects){
            realtiesAvailableList = [];
            realtiesList = [];
            for(let r of p.realties){
                if(r.realty_active_online && r.realty_status === 0) realtiesAvailableList.push(r);
                if(r.realty_active_online) realtiesList.push(r);
            }
            totalRealties = realtiesList.length;
            totalRealtiesAvailable = realtiesAvailableList.length;
            let soldRealties = totalRealties - totalRealtiesAvailable;
            let prctSold = Math.round((soldRealties * 100) / totalRealties);

            p.totalRealties = totalRealties;
            p.totalRealtiesAvailable = totalRealtiesAvailable;
            p.prctSold = prctSold;
        }
        return projects;
    }

    // ** BIENS ** //
    static getRelatyPrice(price, vat,  priceWithVat){
        return priceWithVat ? this.numberWithCommas(price + (price * (vat / 100))) : this.numberWithCommas(price);
    }

    static getRealtySortDetails(arr){
        let floorList = [];
        let gardenList = [];
        for(let r of arr){
            if(r.realty_floor !== null){
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

    static getKitchen(surface, type){
        const kitchen = {
            XE: 'Hyper-équipée',
            CE: 'Equipée',
            SE: 'Semi-équipée',
            NE: 'Non-équipée',
            AS: 'Américaine semi-équipée',
            AC: 'Américaine équipée ',
            AX: 'Américaine hyper-équipée ',
            AN: 'Américaine Non-équipée'
        };

        let txt;
        if(surface && type){
            txt = "Cuisine <strong>" + kitchen[type] + "</strong>: <strong>" + surface + "</strong> m²";
        }else if(surface && !type){
            txt = "Cuisine: <strong>" + surface + "</strong> m²";
        }else if(!surface && type){
            txt = "Cuisine <strong>" + kitchen[type] + "</strong>";
        }
        return txt;
    }

    static getBedrooms(bedrooms){
        let bR = bedrooms.split(";");
        let returnBedrooms = [];
        if(bR.length > 1){
            let i = 1;
            for (let bedroom of bR){
                returnBedrooms.push("Chambre " + i + ": <strong>" + bedroom + "</strong> m²");
                i++;
            }
        }else{
            returnBedrooms.push("Chambre: <strong>" + bR + "</strong> m²");
        }
        return returnBedrooms;
    }

    static getBathrooms(bathrooms, type){

        let bR = bathrooms.split(";");
        let returnBathrooms = [];
        if(bR.length > 1){
            let i = 1;
            for (let bathroom of bR){
                if(type === "bath"){
                    returnBathrooms.push("Salle de bain " + i + ": <strong>" + bathroom + "</strong> m²");
                }else{
                    returnBathrooms.push("Salle de douche " + i + ": <strong>" + bathroom + "</strong> m²");
                }

                i++;
            }
        }else{
            if(type === "bath") {
                returnBathrooms.push("Salle de bain: <strong>" + bR + "</strong> m²");
            }else{
                returnBathrooms.push("Salle de douche: <strong>" + bR + "</strong> m²");
            }
        }
        return returnBathrooms;
    }

    static getOptionalArrow(opt){
        let cls;
        if(opt){
            cls = "fa fa-check theme-color";
        }
        else{
            cls = "fa fa-close ligth-grey-text";
        }
        return cls;
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
            if(r.realty_status === 0) counter++;
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