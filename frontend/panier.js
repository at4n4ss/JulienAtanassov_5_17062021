/* Récupération des produits du panier dans le localStorage */
let elementLocalStorage = JSON.parse(localStorage.getItem('produit'));

/* Création d'un tableau pour calculer le prix total du panier */
let prixTotal = [];

/* Gestion du localStorage et insertion dans hmtl */
if (elementLocalStorage === null) {
  let elementProduits = document.getElementById('produits');
  let elementVide = document.createElement('p');
  elementVide.innerHTML = 'Votre panier est vide';
  elementProduits.appendChild(elementVide);
} else {
  /* ------Récupération de chaque produit et insertion du localstorage ------ */
  elementLocalStorage.forEach(element => {
    let boxCart = document.getElementById('boxCart');
    let rowProduit = document.createElement('div');
    rowProduit.className = 'row border-top border-bottom';
    boxCart.appendChild(rowProduit);
    let rowAlign = document.createElement('div');
    rowAlign.className = 'row main align-items-center';
    rowProduit.appendChild(rowAlign);
    let rowCol = document.createElement('div');
    rowCol.className = 'col';
    rowAlign.appendChild(rowCol);
    /* Nom produit */
    let colName = document.createElement('div');
    colName.className = 'row';
    colName.innerHTML = element.productName;
    rowCol.appendChild(colName);
    /* Prix produit*/
    let colPrice = document.createElement('div');
    colPrice.className = 'col';
    colPrice.innerHTML = element.productPrice;
    rowAlign.appendChild(colPrice);
    /* Bouton supprimer */
    let suppButton = document.createElement('div');
    suppButton.className = 'btn btn-danger supp';
    suppButton.type = 'button';
    suppButton.innerHTML = 'Supprimer';
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
let elementPrixTotal = document.getElementById('elementPrixTotal');
totalPrice.innerHTML += prixFinal;

/* Bouton supprimer */
boxCart.onclick = function (evt) {
  /* On selectionne nos boutons */
  if (evt.target && evt.target.classList.contains('btn-danger')) {
    /* On retrouve le data-id */
    const id = evt.target.dataset.id;
    elementLocalStorage.every((element, index) => {
      const elementString = element.productId;
      /* Si le data-id correspond à un produit du local storage */
      if (elementString === id) {
        /* Le supprimer du localStorage */
        elementLocalStorage.splice(index, 1);
        localStorage.setItem('produit', JSON.stringify(elementLocalStorage));

        return false;
      } else {
        return true;
      }
    });
    /* Suppression du html du produit */
    let evtButton = evt.target;
    evtButton.parentElement.parentElement.remove();
  }
};

/* Accès au formulaire */
let formPanier = document.getElementById('panierForm');

/*-------- Validation des données du formulaire --------*/

/*--- Nom ---*/
formPanier.lastName.addEventListener('change', function () {
  validNames(this);
});
/*--- Prénom ---*/
formPanier.firstName.addEventListener('change', function () {
  validNames(this);
});
/*--- Ville ----*/
formPanier.city.addEventListener('change', function () {
  validNames(this);
});
/*--- Adresse ---*/
formPanier.address.addEventListener('change', function () {
  validAddress(this);
});
/*--- Email ---*/
formPanier.email.addEventListener('change', function () {
  validEmail(this);
});

/* ---- Fonctions regex afin de valier les input ---- */

/* Fonction pour valider nom ,prénom et ville */
const validNames = function (inputName) {
  let nameRegExp = /^[a-z ,.'-]+$/i;
  let testName = nameRegExp.test(inputName.value);
  let falseText = inputName.nextElementSibling;
  if (testName) {
    return true;
  } else {
    falseText.innerHTML = 'Invalide';
    return false;
  }
};
/* Fonction pour valider l'adresse */
const validAddress = function (inputAddress) {
  let addressRegExp = /([0-9a-zA-Z,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)/;
  let testAddress = addressRegExp.test(inputAddress.value);
  let falseAddress = inputAddress.nextElementSibling;
  if (testAddress) {
    return true;
  } else {
    falseAddress.innerHTML = 'Invalide';
    return false;
  }
};
/* Fonction pour valider l'email */
const validEmail = function (inputEmail) {
  let emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let testEmail = emailRegExp.test(inputEmail.value);
  let falseEmail = inputEmail.nextElementSibling;
  if (testEmail) {
    return true;
  } else {
    falseEmail.innerHTML = 'Invalide';
    return false;
  }
};
// Fonction pour valider l'ensemble du formulaire
const validForm = function () {
  if (validNames(formPanier.lastName)) {
    if (validNames(formPanier.firstName)) {
      if (validNames(formPanier.address)) {
        if (validNames(formPanier.city)) {
          if (validNames(formPanier.email)) {
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

/*  Envoi des données au backend  */
function send(e) {
  e.preventDefault();
  validForm();
  if (validForm() == true) {
    getValue();

    console.log(data);
    fetch('http://localhost:3000/api/teddies/order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
    console.log('erreur formulaire');
  }
}
/* Bouton commander */
document.getElementById('panierForm').addEventListener('submit', send);
/*  Fonction pour récupérer les données du formulaire */
function getValue() {
  let lastName = document.getElementById('lastName').value;
  let firstName = document.getElementById('firstName').value;
  let address = document.getElementById('address').value;
  let city = document.getElementById('city').value;
  let email = document.getElementById('email').value;
}
