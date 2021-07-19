/* Récupération des produits du panier dans le localStorage */
let elementLocalStorage = JSON.parse(localStorage.getItem("produit"));

/* Création d'un tableau pour calculer le prix total du panier */
let prixTotal = [];
/* Informer le client que son panier est vide */
const panierVide = function () {
  let elementProduits = document.getElementById("boxCart");
  let elementVide = document.createElement("p");
  elementVide.innerHTML = "Votre panier est vide";
  elementProduits.appendChild(elementVide);
};
/* Gestion du localStorage et insertion dans hmtl */
const panierContent = function () {
  if (elementLocalStorage.length === 0) {
    panierVide();
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
    });
  }
};
panierContent();

/* Prix total */

const totalCart = function () {
  if (elementLocalStorage.length === 0) {
    totalPrice.innerHTML = "0";
  } else {
    prixTotal.splice(0, prixTotal.length);
    elementLocalStorage.forEach(element => {
      let prixx = element.productPrice;
      prixTotal.push(prixx);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let prixFinal = prixTotal.reduce(reducer);
      totalPrice.innerHTML = prixFinal;
    });
  }
};
totalCart();
/* Bouton supprimer */
boxCart.onclick = function (evt) {
  /* On selectionne nos boutons */
  if (evt.target && evt.target.classList.contains("btn-danger")) {
    /* On retrouve le data-id */
    const id = evt.target.dataset.id;
    elementLocalStorage.every((element, index) => {
      const elementString = element.productId;
      /* Si le data-id correspond à un produit du local storage */
      if (elementString === id) {
        /* Le supprimer du localStorage */
        elementLocalStorage.splice(index, 1);
        localStorage.setItem("produit", JSON.stringify(elementLocalStorage));
        return false;
      } else {
        return true;
      }
    });
    /* Suppression du html du produit */
    let evtButton = evt.target;
    evtButton.parentElement.parentElement.remove();
  }
  totalCart();
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
  validAddress(this);
});
/*--- Email ---*/
formPanier.email.addEventListener("change", function () {
  validEmail(this);
});

/* ---- Fonctions regex afin de valier les input ---- */

/* Fonction pour valider nom ,prénom et ville */
const validNames = function (inputName) {
  let nameRegExp = /^[a-z ,.'-]+$/i;
  let testName = nameRegExp.test(inputName.value);
  let falseText = inputName.nextElementSibling;
  if (testName) {
    falseText.innerHTML = "";
    return true;
  } else {
    falseText.innerHTML = "Invalide";
    return false;
  }
};
/* Fonction pour valider l'adresse */
const validAddress = function (inputAddress) {
  let addressRegExp = /^\d+[a-z ,.'-]+[a-z ,.'-]+\d+$/i;
  let testAddress = addressRegExp.test(inputAddress.value);
  let falseAddress = inputAddress.nextElementSibling;
  if (testAddress) {
    falseAddress.innerHTML = "";
    return true;
  } else {
    falseAddress.innerHTML = "Invalide";
    return false;
  }
};
/* Fonction pour valider l'email */
const validEmail = function (inputEmail) {
  let emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let testEmail = emailRegExp.test(inputEmail.value);
  let falseEmail = inputEmail.nextElementSibling;
  if (testEmail) {
    falseEmail.innerHTML = "";
    return true;
  } else {
    falseEmail.innerHTML = "Invalide";
    return false;
  }
};
// Fonction pour valider l'ensemble du formulaire
const validForm = function () {
  if (validNames(formPanier.lastName)) {
    if (validNames(formPanier.firstName)) {
      if (validAddress(formPanier.address)) {
        if (validNames(formPanier.city)) {
          if (validEmail(formPanier.email)) {
            return true;
          }
        }
      }
    }
  } else {
    return false;
  }
};
/*----------- Passer commande -----------*/

let products = [];
elementLocalStorage.forEach(element => {
  product_id = element.productId;
  products.push(product_id);
});
let contact = {
  firstName,
  lastName,
  address,
  city,
  email
};
let data = {
  contact: contact,
  products: products
};

/* ----- Envoi des données au backend ----- */
/*  Fonction pour récupérer les données du formulaire */
function getValue() {
  let lastName = document.getElementById("lastName").value;
  let firstName = document.getElementById("firstName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
}
function send(e) {
  e.preventDefault();
  if (elementLocalStorage.length === 0) {
    alert("Votre panier est vide");
  } else {
    validForm();
    if (validForm() == true) {
      getValue();

      fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          console.log(value);
        });
    } else {
      console.log("erreur dans formulaire");
    }
  }
}
/* Bouton commander */
document.getElementById("panierForm").addEventListener("submit", send);
