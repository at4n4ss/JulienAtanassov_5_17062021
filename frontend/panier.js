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
    /* Insertion du signe € dans le prix */
    let prixx = element.priceProduit;
    let split = prixx.toString().split("");
    let prixAffiche = split[0] + split[1] + "€" + split[2] + split[3];

    /* -- Ajout de chaque produit dans la page panier -- */
    let elementProduits = document.getElementById("produits");
    let produitBox = document.createElement("div");
    produitBox.className = "row";
    elementProduits.appendChild(produitBox);
    /*  Ajout du nom */
    let produitName = document.createElement("div");
    produitName.className = "rowProduits";
    produitName.innerHTML = element.nameProduit;
    produitBox.appendChild(produitName);
    /* Ajout du prix */
    let produitPrix = document.createElement("div");
    produitPrix.className = "rowProduits";
    produitPrix.innerHTML = prixAffiche;

    produitBox.appendChild(produitPrix);
    /*  Quantité et bouton supprimer */
    let elementQuantite = document.createElement("div");
    elementQuantite.className = "cart-quantity cart-column";
    produitBox.appendChild(elementQuantite);
    let quantiteInput = document.createElement("input");
    quantiteInput.className = "cart-quantity-input";
    quantiteInput.type = "number";
    quantiteInput.value = "1";
    elementQuantite.appendChild(quantiteInput);
    let quantiteButton = document.createElement("button");
    quantiteButton.className = "btn btn-danger";
    quantiteButton.type = "button";
    quantiteButton.innerHTML = "Supprimer";
    elementQuantite.appendChild(quantiteButton);
    /* Prix total */
    prixString = prixx.toString();
    prixFloat = parseFloat(prixString);
    prixTotal.push(prixFloat);
  });
}
/* Prix total */
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let prixFinal = prixTotal.reduce(reducer);
console.log(prixFinal);

let elementPrixTotal = document.getElementById("elementPrixTotal");

elementPrixTotal.innerHTML += prixFinal;

/* Bouton supprimer */
/* for (let i = 0; 1 < " btn-danger".lenght; i++) {
  document.body.addEventListener(
    "click",
    function (evt) {
      if (evt.target.className === "btn btn-danger") {
        alert("this");
      }
    },
    false
  );
}
*/
/* Selection de l'élément qui sera supprimer via l'id */
