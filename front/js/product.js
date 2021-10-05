//On declare nos fonctions dans une fonction principale
(async function () {
  const articleId = getArticleId();
  const article = await getArticle(articleId);
  articleDisplay(article);
  getArticleColors(article);
  titleDisplay(article);
  addArticleToBasket(article);
})();

//On recupere les articles avec leur ID
function getArticle(articleId) {
  return fetch(`http://localhost:3000/api/products/${articleId}`)
    .then((res) => res.json())
    .then((articles) => articles)
    .catch((error) => (error = alert("Une erreure es survenue avec L'API")));
}

//On rajoute l'ID de chaque produit dans l'adresse de la page
function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

//On ajoute le titre de la page Web correspondant à l'article
function titleDisplay(article) {
  document.querySelector("title").textContent = `${article.name}`;
}

//On fait apparaitre le bon article de facon dynamique
function articleDisplay(article) {
  document.querySelector("section").innerHTML += `
    <article>
            <divz class="item__img">
              <img src="${article.imageUrl}" alt="${article.altTxt}">
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${article.name}</h1>
                <p>Prix : <span id="price">${article.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${article.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Couleure :</label>
                  <select name="color-select" id="colors">
                      
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" maxlength="3" min="1" max="100" value="1" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          </article>
    
    `;
}

//Ajout du choix de la couleure
function getArticleColors(article) {
  for (let color of article.colors) {
    colorContainer = document.getElementById("colors").innerHTML += `  
      <option value="${color}">
      ${color}   
      </option> 
      `;
  }
}
//Création du panier

function addArticleToBasket(article) {
  document.getElementById("addToCart").addEventListener("click", (e) => {
    e.preventDefault();

    //On récupere le choix de la couleure et de la quantité
    const choixColor = document.getElementById("colors").value;
    const choixQuantite = document.getElementById("quantity").value;

    // Création d'un objet type contenant les informations du produit
    const product = {
      image: article.imageUrl,
      nom: article.name,
      id: article._id,
      quantite: choixQuantite,
      couleure: choixColor,
      prix: article.price,
    };
    

    let userPanier = JSON.parse(localStorage.getItem("panier"));
    // Verification de l'existence du panier
    //Si il existe on ajoute le produit
    if (userPanier) {
      userPanier.push(product);
      localStorage.setItem("panier", JSON.stringify(userPanier));
      alert("Votre article à bien été ajouter au panier");
      //Sinon on le créer avant d'ajouter le produit
    } else {
      userPanier = [];
      userPanier.push(product);
      localStorage.setItem("panier", JSON.stringify(userPanier));
      alert("Votre article à bien été ajouter au panier");
    }

    //Verification si un produit similaire es deja present dans le panier
  });
}
