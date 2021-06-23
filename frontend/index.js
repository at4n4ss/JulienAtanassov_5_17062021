let url = "http://localhost:3000/api/teddies";

/* 
async function fetchData() {
  const response = await fetch(url);
  let data = await response.json();
  return data;
}
fetchData().then((data) => console.log(data));



fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach(ours => {
      var elementName = document.createElement("p");
      elementName.textContent = ours.name;

      document.getElementById("content").appendChild(elementName);
    });
  });
*/

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(ours => {
      /* Accès au DOM*/

      const element = document.getElementById("cards");

      /* Création du Card*/

      var elementBox = document.createElement("div");
      elementBox.className = "col-md-4";
      element.appendChild(elementBox);
      const elementTitle = document.createElement("div");
      elementTitle.className = "card";
      elementBox.appendChild(elementTitle);
      const elementImg = document.createElement("img");
      var oursImg = ours.imageUrl;
      elementImg.src = oursImg;
      elementImg.className = "card-img-top";
      elementTitle.appendChild(elementImg);
      const elementCardBody = document.createElement("div");
      elementCardBody.className = "card-body";
      elementTitle.appendChild(elementCardBody);
      const elementText = document.createElement("p");
      elementText.className = "card-text";
      elementText.innerHTML = ours.name;
      elementCardBody.appendChild(elementText);
    });
  });

/* 
  Chaque card d'un ours est un lien vers produit.html?id=bedazds
  */
