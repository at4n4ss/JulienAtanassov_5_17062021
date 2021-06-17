let url = "http://localhost:3000/api/teddies";

fetch(url).then((response) =>
  response.json().then((data) => {
    console.log(data);
  })
);
