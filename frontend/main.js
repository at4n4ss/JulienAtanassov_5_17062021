/* Fonction pour retourner les data du back */
function fetchData() {
  let data = fetch(url).then(response => response.json());
  return data;
}

/* Création du tableau contenant les variables des produits */
let oursColor = [];
let oursId = [];
let oursNom = [];
let oursPrice = [];
let oursImgUrl = [];
let oursDesc = [];

function affichageProduits(response) {
  for (i = 0; i < response.length; i++) {
    /* Insertion des données du back dans les tableaux */
    fetchData().then(element => {
      element.forEach((element, i) => {
        oursColor[i] = element.colors;
        oursId[i] = element._id;
        oursNom[i] = element.name;
        oursPrice[i] = element.price;
        oursImgUrl[i] = element.imageUrl;
        oursDesc[i] = element.description;
      });
    });
  }
}
fetchData().then(response => {
  affichageProduits(response);
  console.log(oursImgUrl);
});
