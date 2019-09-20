let api;

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined) {
   api = "http://127.0.0.1:4000/api/";
}
else
{
  api = "https://imoges-api.herokuapp.com/api/";
}

module.exports = {
 "company": {
   "name": "Imoges",
   "email":"info@imoges.be",
   "phone": "0487/75 03 06",
   "address": "41 avenue de la Déportation",
   "pc": "7190",
   "city": "Ecaussinnes",
   "juridical": "S.P.R.L.",
   "facebook": "https://www.facebook.com/imoges.construction",
   "youtube": "https://www.youtube.com/user/imogesconstruction"
 },
  "ws_settings": {
    "coreConfig": {
      "priceWithVat": false,
      "gmapKey": "AIzaSyCqE_AnI_z-LGEuQX6X1Ofc9H9a-R5Ceu0",
      "homeHighlightMax": 4,
      "api": api
    },
    "navData": {
      "company": [
        {
          "label": "A propos",
          "service": "about"
        },
        {
          "label": "Historique",
          "service": "history"
        },
        {
          "label": "Charte de qualité",
          "service": "qualitychart"
        }
      ]
    }
  }
};