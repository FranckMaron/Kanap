(async function () {
  userPanier = JSON.parse(localStorage.getItem("panier"));
  panierDisplay();
  totalPrice();
  totalQuantite();
})();

function panierDisplay() {
  const panierContainer = document.getElementById("cart__items");
  if (userPanier === null) {
    panierContainer.innerHTML = `
    <article class="cart__item" data-id="{product-ID}">    
        <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
                <h1>Votre panier es vide pour le moment</h1>
            </div>
        </div>
    </article> 
`;
  } else {
    for (produit of userPanier) {
      panierContainer.innerHTML += `
        <article class="cart__item" data-id="${produit.id}">  
            <div class="cart__item__img">
                <img src="${produit.image}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${produit.nom}</h2>
                    <p>Prix unitaire : ${produit.prix}</p>
                    <p>Prix total : ${produit.prix * produit.quantite} €</p>
                </div>
                <div class="cart__item">
                  <p>Couleur : ${produit.couleur}</p>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                          produit.quantite
                        }">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <button class="deleteItem">Supprimer</button>
                    </div>
                </div>
            </div>
      </article> 
        
        
        `;
    }
  }
}

// incompréhension totale les event ne semble pas fonctionner avec querySelectorAll

// //Calcul du nouveau prix en cas d'ajout ou de retrait d'article depuis le panier
// function choixQuantiteInPanier() {
//     document.querySelectorAll(".itemQuantity").addEventListener("input", (e) => {
//         console.log("ca marche");
//     })
//     console.log(newQuantity);

// }choixQuantiteInPanier()

//Supprimer un article du panier
// function deleteItem() {
//     document.querySelectorAll(".deleteItem").addEventListerner("click", (e) => {
//         console.log("je part");
//     })
// }deleteItem()

//Calcul du prix total de notre panier
function totalPrice() {
  //creation d'un tableau qui contiendra chaque prix du panier
  let prixPanier = [];
  //On boucle sur tout les prix trouver dans le panier
  for (i = 0; i < userPanier.length; i++) {
    //On transforme les string prix en number
    let prixTotal =
      parseInt(userPanier[i].prix) * parseInt(userPanier[i].quantite);
    prixPanier.push(prixTotal);
  }
  //On utilise la méthode reduce pour additioner tout nos prix du panier
  const calculTotal = (acc, curr) => acc + curr;
  document.getElementById("totalPrice").textContent =
    prixPanier.reduce(calculTotal);
}

// Calcul du nombre d'article total dans notre panier avec le meme fonctionnement que le prix total
function totalQuantite() {
  let quantitePanier = [];
  for (i = 0; i < userPanier.length; i++) {
    let quantiteTotal = parseInt(userPanier[i].quantite);
    quantitePanier.push(quantiteTotal);
    const calculTotal = (acc, curr) => acc + curr;
    document.getElementById("totalQuantity").textContent =
      quantitePanier.reduce(calculTotal);
  }
  console.log(userPanier);
}
