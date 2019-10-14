$(document).ready(()=>{
    initMap($("#map").data("page"));
});

function initMap(page){
    let latLng = {lat: $("#map").data("lat"), lng: $("#map").data("lng")};
    let map = new google.maps.Map(document.getElementById('map'), {
        center: latLng,
        zoom: 17,
        mapTypeId: 'satellite'
    });
    let marker = new google.maps.Marker({position: latLng, map: map});

    switch(page){
        case "project":
            let pHeight = $("#presentation").height();
            let iHeight = $("#infos").height();
            let maxHeight = pHeight > iHeight ? pHeight : iHeight;
            if(maxHeight > 200){
                $("#map").removeClass("height-200");
                $("#map").height(maxHeight);
            }
            break;
    }
}