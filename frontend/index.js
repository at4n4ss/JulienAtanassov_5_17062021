let url = new URL("http://localhost:3000/api/teddies");

const fetchData = function (url) {
  let data = fetch(url).then(response => response.json());
  return data;
};
/* Création d'un Card pour chaque produit (ours) dans index.html */
const elementsProducts = function (ours) {
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
  let prixx = ours.price;
  const elementPrice = document.createElement("p");
  elementPrice.className = "card-text";
  elementPrice.innerHTML = prixx;
  elementCardBody.appendChild(elementPrice);
  /* Bouton acheter et lien ID */
  let elementID = ours._id;
  const elementButton = document.createElement("a");
  elementButton.className = "btn btn-primary";
  elementButton.href = "frontend/produit.html?id=" + elementID;
  elementButton.innerHTML = "Description du produit";
  elementCardBody.appendChild(elementButton);
};

fetchData(url)
  .then(data => {
    data.forEach(ours => {
      elementsProducts(ours);
    });
  })
  .catch(error => {
    alert("Site en maintenance");
    console.log(error);
  });
