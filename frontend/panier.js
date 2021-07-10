/* Récupération des produits dans le localStorage */

let elementLocalStorage = JSON.parse(localStorage.getItem("produit"));
let prixTotal = [];

/* Si le panier est vide*/
if (elementLocalStorage === null) {
  let elementProduits = document.getElementById("produits");
  let elementVide = document.createElement("p");
  elementVide.innerHTML = "Votre panier est vide";
  elementProduits.appendChild(elementVide);
} else {
  /* ------Récupération de chaque produit------ */
  elementLocalStorage.forEach(element => {
    let boxCart = document.getElementById("boxCart");
    let rowProduit = document.createElement("div");
    rowProduit.className = "row border-top border-bottom";
    boxCart.appendChild(rowProduit);
    let rowAlign = document.createElement("div");
    rowAlign.className = "row main align-items-center";
    rowProduit.appendChild(rowAlign);
    let rowCol = document.createElement("div");
    rowCol.className = "col";
    rowAlign.appendChild(rowCol);
    /* Nom produit */
    let colName = document.createElement("div");
    colName.className = "row";
    colName.innerHTML = element.oursNom;
    rowCol.appendChild(colName);
    /* Prix produit*/
    let colPrice = document.createElement("div");
    colPrice.className = "col";
    colPrice.innerHTML = element.oursPrice;
    rowAlign.appendChild(colPrice);
    /* Bouton supprimer */
    let suppButton = document.createElement("div");
    suppButton.className = "btn btn-danger supp";
    suppButton.type = "button";
    suppButton.innerHTML = "Supprimer";
    suppButton.dataset.id;
    suppButton.dataset.id = element.oursId;
    rowAlign.appendChild(suppButton);
    /* Total price */
    let totalPrice = document.getElementById("priceTotal");
    let prixx = element.oursPrice;
    prixString = prixx.toString();
    prixFloat = parseFloat(prixString);
    prixTotal.push(prixFloat);
  });
}
/* Prix total */

const reducer = (accumulator, currentValue) => accumulator + currentValue;
let prixFinal = prixTotal.reduce(reducer);

let elementPrixTotal = document.getElementById("elementPrixTotal");

totalPrice.innerHTML += prixFinal;

/* Bouton supprimer */

boxCart.onclick = function (evt) {
  /* On selectionne nos boutons */
  if (evt.target && evt.target.classList.contains("btn-danger")) {
    /* On retrouve le data-id */
    const id = evt.target.dataset.id;
    elementLocalStorage.forEach((element, index) => {
      const elementString = element.oursId.toString();
      /* Si le data-id correspond à un produit du local storage */
      if (elementString === id) {
        /* Le supprimer du localStorage */

        elementLocalStorage.splice(index, 1);

        localStorage.setItem("produit", JSON.stringify(elementLocalStorage));
        /* Le supprimer du html */
      }
    });
    /* Suppression du html du produit */
    let evtButton = evt.target;
    evtButton.parentElement.parentElement.remove();
  }
};

/*----- Validation des données du formulaire -----*/

/* Accès au formulaire */
let formPanier = document.getElementById("panierForm");
/*--- Nom ---*/
formPanier.nom.addEventListener("change", function () {
  validNames(this);
});

/*--- Prénom ---*/
formPanier.prenom.addEventListener("change", function () {
  validNames(this);
});

/* Fonction contenant le regExp pour valider nom et prénom */
const validNames = function (inputName) {
  let nameRegExp = /^[a-z ,.'-]+$/i;
  let testName = nameRegExp.test(inputName.value);
  let falseText = inputName.nextElementSibling;
  if (testName) {
    falseText.innerHTML = "Nom valide";
  } else {
    falseText.innerHTML = "Nom invalide";
  }
};

/*--- Adresse ---*/
formPanier.adresse.addEventListener("change", function () {
  validAdress(this);
});
const validAdress = function (inputAdress) {
  let adressRegExp = /^([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)/;
  let testAdress = adressRegExp.test(inputAdress.value);
  let falseAdress = inputAdress.nextElementSibling;
  if (testAdress) {
    falseAdress.innerHTML = "Adresse valide";
  } else {
    falseAdress.innerHTML = "Adresse invalide";
  }
};

/* Tableau contenant les informations du client */

let contact = [];
