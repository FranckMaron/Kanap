let order = JSON.parse(localStorage.getItem("order"));
let userPanier = JSON.parse(localStorage.getItem("panier"))
document.getElementById("orderId").textContent = order.orderId