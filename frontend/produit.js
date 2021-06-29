let params = new URL(document.location).searchParams;
let idours = params.get("id");
let urlId = "http://localhost:3000/api/teddies/" + idours;
console.log(urlId);

/* Ajout des informations du produit relié à l'id */
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
    buttonCart.addEventListener(
      "click",
      function () {
        sessionStorage.setItem("id", data._id);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("price", data.price);
        var localName = sessionStorage.getItem("name");
        console.log(localName);
      },
      false
    );
  });

/* Bouton ajouter au panier */
/*
localStorage.setItem("id", data._id);
localStorage.setItem("name", data.name);
localStorage.setItem("price", data.price);
var localName = localStorage.getItem("name");
    console.log(localName);
    */
