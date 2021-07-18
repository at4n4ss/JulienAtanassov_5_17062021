/* Récupération des produits dans le localStorage */
let elementLocalStorage = JSON.parse(localStorage.getItem("produit"));

/* Création d'un tableau pour calculer le prix total du panier */
let prixTotal = [];

/* Gestion du localStorage et insertion dans hmtl */
if (elementLocalStorage === null) {
  let elementProduits = document.getElementById("produits");
  let elementVide = document.createElement("p");
  elementVide.innerHTML = "Votre panier est vide";
  elementProduits.appendChild(elementVide);
} else {
  /* ------Récupération de chaque produit et insertion du localstorage ------ */
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
    colName.innerHTML = element.productName;
    rowCol.appendChild(colName);
    /* Prix produit*/
    let colPrice = document.createElement("div");
    colPrice.className = "col";
    colPrice.innerHTML = element.productPrice;
    rowAlign.appendChild(colPrice);
    /* Bouton supprimer */
    let suppButton = document.createElement("div");
    suppButton.className = "btn btn-danger supp";
    suppButton.type = "button";
    suppButton.innerHTML = "Supprimer";
    suppButton.dataset.id;
    suppButton.dataset.id = element.productId;
    rowAlign.appendChild(suppButton);
    /* Total price */
    let prixx = element.productPrice;

    prixFloat = parseFloat(prixx);
    prixTotal.push(prixFloat);
    produits = elementLocalStorage;
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
      const elementString = element.productId.toString();
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

/* Accès au formulaire */
let formPanier = document.getElementById("panierForm");

/*-------- Validation des données du formulaire --------*/

/*--- Nom ---*/
formPanier.lastName.addEventListener("change", function () {
  validNames(this);
});
/*--- Prénom ---*/
formPanier.firstName.addEventListener("change", function () {
  validNames(this);
});
/*--- Ville ----*/
formPanier.city.addEventListener("change", function () {
  validNames(this);
});
/*--- Adresse ---*/
formPanier.address.addEventListener("change", function () {
  validAdress(this);
});
/*--- Email ---*/
formPanier.email.addEventListener("change", function () {
  validEmail(this);
});

/* ---- Fonctions regex afin de valier les input ---- */

/* Fonction  pour valider nom ,prénom et ville */
const validNames = function (inputName) {
  let nameRegExp = /^[a-z ,.'-]+$/i;
  let testName = nameRegExp.test(inputName.value);
  let falseText = inputName.nextElementSibling;
  if (testName) {
    falseText.innerHTML = "valide";
  } else {
    falseText.innerHTML = "invalide";
  }
};
/* Fonction  pour valider l'adresse */
const validAdress = function (inputAddress) {
  let addressRegExp = /^([0-9]*) ?([a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)/;
  let testAddress = addressRegExp.test(inputAddress.value);
  let falseAdress = inputAddress.nextElementSibling;
  if (testAdress) {
    falseAdress.innerHTML = "Adresse valide";
  } else {
    falseAdress.innerHTML = "Adresse invalide";
  }
};
/* Fonction  pour valider l'email */
const validEmail = function (inputEmail) {
  let emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let testEmail = emailRegExp.test(inputEmail.value);
  let falseEmail = inputEmail.nextElementSibling;
  if (testEmail) {
    falseEmail.innerHTML = "Email valide";
  } else {
    falseEmail.innerHTML = "Email invalide";
  }
};

/*----------- Passer commande -----------*/

/* Ecoute bouton commander */

/* Récupération des données du formulaire */
let params = new URL(document.location).searchParams;

let firstName = params.get("firstName");
let lastName = params.get("lastName");
let address = params.get("address");
let city = params.get("city");
let email = params.get("email");

let products = [];
elementLocalStorage.forEach(element => {
  elementString = JSON.stringify(element)
  products.push(element);
});

console.log(products);
let contact = {
  firstName: firstName,
  lastName: lastName,
  address: address,
  city: city,
  email: email
};
let data = {
  contact:contact,
  products:products,
};
console.log(JSON.stringify(data));
/*  Envoi des données au backend  */
function send(e) {
  e.preventDefault();
  fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json"
    },
    body: JSON.stringify(data)
  })
  
}
/* Bouton commander */
document.getElementById("panierForm").addEventListener("submit", send)
