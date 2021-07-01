let params = new URL(document.location).searchParams;
let idours = params.get("id");
let urlId = "http://localhost:3000/api/teddies/" + idours;
console.log(urlId);

/* Ajout des informations du produit sur la card  */
fetch(urlId)
  .then(response => response.json())
  .then(data => {
    var element = document.getElementById("card-title-id");
    element.textContent += data.name;
    var elementImg = document.getElementById("card-img");
    elementImg.src = data.imageUrl;
    var elementDesc = document.getElementById("card-desc");
    elementDesc.textContent = data.description;

    var buttonCart = document.getElementById("bouton");
    /* Ajout des données au local storage  */

    /* Bouton ajouter au panier */
    buttonCart.addEventListener("click", event => {
      event.preventDefault();
      /* Récupération du produit pour l'introduire après au localStorage  */
      let dataProduit = {
        nameProduit: data.name,
        idProduit: data._id,
        priceProduit: data.price,
      };
      console.log(dataProduit);

      /* Déclaration de la variable où seront stockés keys/values du localStoage */
      let elementLocalStorage = JSON.parse(localStorage.getItem("Produit"));
      console.log(elementLocalStorage);

      if (elementLocalStorage) {
        elementLocalStorage.push(dataProduit);
        localStorage.setItem("produit", JSON.stringify(elementLocalStorage));
        console.log(elementLocalStorage);
      } else {
        elementLocalStorage = [];
        elementLocalStorage.push(dataProduit);

        localStorage.setItem("produit", JSON.stringify(elementLocalStorage));
      }
    });
  });
