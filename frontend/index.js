let url = new URL("http://localhost:3000/api/teddies");

/* 
async function fetchData() {
  const response = await fetch(url);
  let data = await response.json();
  return data;
}
fetchData().then((data) => console.log(data));
*/

/* Création d'un Card pour chaque produit (ours) dans index.html */
fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(ours => {
      let oursName = ours.name;
      /* Accès au DOM */
      const element = document.getElementById("cards");
      /* Structure du card */
      var elementBox = document.createElement("div");
      elementBox.className = "col-md-4";
      element.appendChild(elementBox);

      const elementTitle = document.createElement("div");
      elementTitle.className = "card";
      elementBox.appendChild(elementTitle);

      /* Image du produit */
      const elementImg = document.createElement("img");
      var oursImg = ours.imageUrl;
      elementImg.src = oursImg;
      elementImg.className = "card-img-top";
      elementTitle.appendChild(elementImg);
      /* Structure du card */
      const elementCardBody = document.createElement("div");
      elementCardBody.className = "card-body";
      elementTitle.appendChild(elementCardBody);
      /* Nom du produit */
      const elementText = document.createElement("h5");
      elementText.className = "card-text";
      elementText.innerHTML = ours.name;
      elementCardBody.appendChild(elementText);
      /* Prix du produit */
      const elementPrice = document.createElement("p");
      elementPrice.className = "card-text";
      elementPrice.innerHTML = ours.price;
      elementCardBody.appendChild(elementPrice);
      /* Bouton acheter et lien ID */
      let elementID = ours._id;
      const elementButton = document.createElement("a");
      elementButton.className = "btn btn-primary";

      elementButton.innerHTML = "Acheter";
      elementCardBody.appendChild(elementButton);
      /* Lien enveloppant le card */

      /* const cardLink = document.createElement("a");
      cardLink.className = "stretched-link";
      cardLink.href = "produit.html?id=" + elementID;
      elementTitle.appendChild(cardLink); */

      document.body.addEventListener("click", function (evt) {
        evt.preventDefault();
        if (evt.target.className === "btn btn-primary") {
          alert("yo");
        }
      });
    }, false);
  });

/* Ajout des données au local storage  */
