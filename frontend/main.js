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
});

/* ----------- Ajout des données au local storage ------------- */
for (i = 0; i < data.length; i++) {
  /* Insertion des données du produit dans les tableaux */

  element.forEach((data, i) => {
    oursColor[i] = data.colors;
    oursId[i] = data._id;
    oursNom[i] = data.name;
    oursPrice[i] = data.price;
    oursImgUrl[i] = data.imageUrl;
    oursDesc[i] = data.description;
  });
}
