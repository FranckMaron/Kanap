let userPanier = JSON.parse(localStorage.getItem("panier"));

//-------------------------------Fonction principale-------------------------------------------

(async function () {
  panierDisplay();
  totalQuantite();
  choixQuantiteInPanier();
  totalPrice();
  deleteItem();
  sendCommand();
})();

//---------------------------Affichage du panier sur la page-----------------------------------

function panierDisplay() {
  //Si le panier es vide, on le dit à l'utilisateur
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
    //Sinon on affiche les produits
  } else {
    for (i = 0; i < userPanier.length; i++) {
      let produit = userPanier[i];
      panierContainer.innerHTML += `
        <article class="cart__item" data-id="${produit.id}">  
            <div class="cart__item__img">
                <img src="${produit.image}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${produit.nom}</h2>
                    <p>Prix unitaire : ${produit.prix}</p>
                </div>
                <div class="cart__item">
                  <p>Couleur : ${produit.couleur}</p>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input id="${i}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantite}">
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

// Calcul du nouveau prix en cas d'ajout ou de retrait d'article depuis le panier
function choixQuantiteInPanier() {
  const inputQuantity = document.querySelectorAll(".itemQuantity");
  //uniquement le dernier article prend la nouvelle valeur peu importe ou on clique
  inputQuantity.forEach((input) => {
    input.addEventListener("input", () => {
      let produit = userPanier[input.id];
      produit.quantite = input.value;
      totalPrice();
      totalQuantite();
      localStorage.setItem("panier", JSON.stringify(userPanier));
    });
  });
}

//Supprimer un article du panier
function deleteItem() {
  const btnDelete = document.querySelectorAll(".deleteItem");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      //On cible le bon produit en recuperant son id
      const article = btn.closest("article");
      const articleViser = article.dataset.id;
      const resultFind = userPanier.find((el) => el.id === articleViser);
      userPanier.splice(userPanier.indexOf(resultFind), 1);
      console.log(userPanier);
      localStorage.setItem("panier", JSON.stringify(userPanier));
      if (userPanier.length === 0) {
        localStorage.removeItem("panier");
      }
      location.reload();
    });
  });
}

//Calcul du prix total de notre panier
function totalPrice() {
  //creation d'un tableau qui contiendra chaque prix du panier
  let prixPanier = [];
  //On boucle sur tout les produit trouver dans le panier
  for (produit of userPanier) {
    //On transforme les string prix en number
    let prixTotal = parseInt(produit.prix) * parseInt(produit.quantite);
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
  if (userPanier) {
    for (produit of userPanier) {
      let quantiteTotal = parseInt(produit.quantite);
      quantitePanier.push(quantiteTotal);
      const calculTotal = (acc, curr) => acc + curr;
      document.getElementById("totalQuantity").textContent =
        quantitePanier.reduce(calculTotal);
    }
  } else {
  }
}
//-----------------------------------------FORMULAIRE------------------------------------------
// Vérification de la validité du prenom
const prenom = document.getElementById("firstName");
prenom.addEventListener("change", function (event) {
  if (checkForm(prenom.value, "text")) {
  } else {
    alert(
      "Veuillez vérifier votre prénom! (Ne pas mettre de nombres ni symboles et avoir 3 caractères minimum)"
    );
    event.preventDefault();
  }
});

// Vérification de la validité du nom
const nom = document.getElementById("lastName");
nom.addEventListener("change", function (event) {
  if (checkForm(nom.value, "text")) {
  } else {
    alert(
      "Veuillez vérifier votre Nom (Ne pas mettre de nombres ni symboles et avoir 3 caractères minimum!)"
    );
    event.preventDefault();
  }
});
// Vérification de la validité de l'adresse
const adresse = document.getElementById("address");
adresse.addEventListener("change", function (event) {
  if (checkForm(adresse.value, "city")) {
  } else {
    alert("Vérifiez votre adresse !");
    event.preventDefault();
  }
});
// Vérification de la validité de la ville
const ville = document.getElementById("city");
ville.addEventListener("change", function (event) {
  if (checkForm(ville.value, "text")) {
  } else {
    alert(
      "Vérifiez votre ville ! (Ne pas mettre de nombres ni symboles et avoir 3 caractères minimum)"
    );
    event.preventDefault();
  }
});

// Vérification de la validité du mail
const mail = document.getElementById("email");
mail.addEventListener("change", function (event) {
  if (checkForm(mail.value, "email")) {
  } else {
    alert("Veuillez vérifier votre adresse mail");
    event.preventDefault();
  }
});

//On creer la fonction de verification du formulaire avec en parametre la valeur et le type
function checkForm(val, type) {
  let rgxp;
  switch (type) {
    case "text":
      rgxp = /^[A-Z-a-z\s]{3,40}$/;
      break;
    case "city":
      rgxp = /^[0-9\s]{1,3}[-a-zA-Zàâäéèêëïîôöùûüç]/;
      break;
    case "email":
      rgxp = /^[a-zA-Z0-9.]{4,}@[a-zA-Z0-9-]{3,}\.[a-zA-Z0-9-]{2,}$/;
      break;
    default:
      rgxp = /^[a-zA-Z0-9_ ]{2,}$/;
      break;
  }
  return val.match(rgxp);
}

//Si tout est correctement rempli alors on passe la commande
function sendCommand() {
  const ValidateCommand = document.getElementById("order");
  ValidateCommand.addEventListener("click", function (event) {
    event.preventDefault();
    if (
      checkForm(nom.value, "text") &&
      checkForm(prenom.value, "text") &&
      checkForm(mail.value, "email") &&
      checkForm(ville.value, "text") &&
      checkForm(adresse.value, "city")
    ) {
      //on crée un contact
      const contact = {
        lastName: nom.value,
        firstName: prenom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value,
      };
      //on crée la liste
      const products = [];
      for (let item of userPanier) {
        products.push(item.id);
      }
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("order", JSON.stringify(data));
          window.location = "confirmation.html";
        });
    } else {
      alert("Une erreure es survenue, veuillez vérifier votre panier ainsi que votre formulaire !");
    }
  });
}
