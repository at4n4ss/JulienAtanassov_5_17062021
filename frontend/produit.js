/* Rediriger le client vers l'acceuil */
function RedirectionIndex() {
  document.location.href = "../index.html";
}
/* Fonction pour retourner les data du back */
const fetchData = function (urlId) {
  let data = fetch(urlId).then(response => response.json());
  return data;
};

/* Ajout des informations du produit sur la card  */
const cardElements = function (data) {
  var element = document.getElementById("card-title-id");
  element.textContent += data.name;
  var elementImg = document.getElementById("card-img");
  elementImg.src = data.imageUrl;
  var elementDesc = document.getElementById("card-desc");
  elementDesc.textContent = data.description;
  /* Prix du produit */
  let prixx = data.price;
  let elementPriceBox = document.getElementById("priceElement");
  elementPriceBox.textContent = prixx;
  /* Liste options couleurs */
  let colorOptions = data.colors;
  let elementOptions = document.getElementById("colorOptions");
  colorOptions.forEach(function (item) {
    console.log(item);

    elementOptions.innerHTML += "<option>" + item + "</option>";
  });
};

let addToCard = function () {
  let params = new URL(document.location).searchParams;
  let idours = params.get("id");
  if (idours == null) {
    alert("Veuillez choisir un produit");
    RedirectionIndex();
  } else {
    let urlId = "http://localhost:3000/api/teddies/" + idours;
    fetchData(urlId).then(data => {
      cardElements(data);
    });
  }
};
addToCard();

/* -------   Bouton ajouter au panier  ------- */

const addToCart = function (evt) {
  evt.preventDefault();
  let params = new URL(document.location).searchParams;
  let idours = params.get("id");
  /* Déclaration de la variable où seront stockés keys/values du localStoage */
  let elementLocalStorage = JSON.parse(localStorage.getItem("produit"));
  let urlId = "http://localhost:3000/api/teddies/" + idours;
  /* Ajout des valeurs du produit dans le tableau dataProduit */
  fetchData(urlId).then(data => {
    let productId = data._id;
    let productName = data.name;
    let productPrice = data.price;
    let dataProduit = {
      productName: productName,
      productId: productId,
      productPrice: productPrice
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
};
let buttonCart = document.getElementById("bouton");
buttonCart.addEventListener("click", addToCart);
