/* Paramétrage du lien en relation avec l'id du produit selectionné */
let params = new URL(document.location).searchParams;
let idours = params.get("id");
let urlId = "http://localhost:3000/api/teddies/" + idours;

/* Fonction pour retourner les data du back */
function fetchData() {
  let data = fetch(urlId).then(response => response.json());
  return data;
}

/* Ajout des informations du produit sur la card  */
fetchData().then(data => {
  var element = document.getElementById("card-title-id");
  element.textContent += data.name;
  var elementImg = document.getElementById("card-img");
  elementImg.src = data.imageUrl;
  var elementDesc = document.getElementById("card-desc");
  elementDesc.textContent = data.description;
  /* Prix du produit */
  /* Insertion du signe € dans le prix */
  let prixx = data.price;
  let split = prixx.toString().split("");
  let prixAffiche = split[0] + split[1] + "€" + split[2] + split[3];
  console.log(prixAffiche);
  let elementPriceBox = document.getElementById("priceElement");
  elementPriceBox.textContent = prixAffiche;
});

/* Création du tableau contenant les variables des produits */
let productId;
let productName;
let productPrice;

/* Création de l'objet qui sera envoyé au localStorage */

/* -------   Bouton ajouter au panier  ------- */
var buttonCart = document.getElementById("bouton");
buttonCart.addEventListener("click", event => {
  event.preventDefault();

  /* Déclaration de la variable où seront stockés keys/values du localStoage */
  let elementLocalStorage = JSON.parse(localStorage.getItem("produit"));

  /* Ajout des valeurs du produit dans le tableau dataProduit */
  fetchData().then(data => {
    let productId = data._id;
    let productName = data.name;
    let productPrice = data.price;
    let dataProduit = {
      productName: productName,
      productId: productId,
      productPrice: productPrice,
    };
    console.log(dataProduit);

    /* if:true Si le local storage n'est pas vide */
    if (elementLocalStorage) {
      elementLocalStorage.push(dataProduit);
      localStorage.setItem("produit", JSON.stringify(elementLocalStorage));
    } else {
      elementLocalStorage = [];
      elementLocalStorage.push(dataProduit);
      localStorage.setItem("produit", JSON.stringify(elementLocalStorage));
    }
  });
});
