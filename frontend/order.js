let elementLocalOrder = JSON.parse(localStorage.getItem("order"));
let contactOrder = elementLocalOrder[0];
let orderTotalPrice = [];

/* Insertion dans html */
const makeContact = function () {
  let orderId = contactOrder.orderId;

  document.getElementById("orderId").innerHTML =
    "ID de votre commande: " + orderId;
};
makeContact();

/* Prix total  */
const prixTotal = function () {
  let orderProducts = contactOrder.products;
  orderProducts.forEach(element => {
    orderTotalPrice.push(element.price);
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let prixFinal = orderTotalPrice.reduce(reducer);

  document.getElementById("orderTotalPrice").innerHTML =
    "Total de votre commande: " + prixFinal;
};
prixTotal();
