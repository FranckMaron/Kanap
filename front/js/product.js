let userPanier = JSON.parse(localStorage.getItem("panier"));

//------------------On declare nos fonctions dans une fonction principale----------------------

(async function () {
  const articleId = getArticleId();
  const article = await getArticle(articleId);
  articleDisplay(article);
  getArticleColors(article);
  titleDisplay(article);
  addArticleToBasket(article);
})();

//---------------------------On recupere les articles avec leur ID-----------------------------

function getArticle(articleId) {
  return fetch(`http://localhost:3000/api/products/${articleId}`)
    .then((res) => res.json())
    .then((articles) => articles)
    .catch((error) => (error = alert("Une erreure es survenue avec L'API")));
}

//----------On rajoute l'ID de chaque produit dans l'adresse de la page------------------------

function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

//--------------On ajoute le titre de la page Web correspondant à l'article--------------------

function titleDisplay(article) {
  document.querySelector("title").textContent = `${article.name}`;
}

//------------------On fait apparaitre le bon article de facon dynamique-----------------------

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

//------------------------------Ajout du choix de la couleure----------------------------------

function getArticleColors(article) {
  for (let color of article.colors) {
    document.getElementById("colors").innerHTML += `  
      <option value="${color}">
      ${color}   
      </option> 
      `;
  }
}

//-----------------------------Ajoute un article au panier-----------------------------------
function addArticleToBasket(article) {
  document.getElementById("addToCart").addEventListener("click", (e) => {
    e.preventDefault();

    const choixColor = document.getElementById("colors").value;
    const choixQuantite = document.getElementById("quantity").value;

    

    const product = {
      image: article.imageUrl,
      nom: article.name,
      id: article._id,
      quantite: parseInt(choixQuantite),
      couleur: choixColor,
      prix: article.price,
    };

    //Verification d'une quantité valide
    //si quantité invalide on affaiche une erreure
    if (choixQuantite < 1 || choixQuantite > 100) {
      alert("Veuillez entrez une quantité entre 1 et 100")
      //sinon on verifie l'existance du panier et si un produit identique es déja dedans 
    } else {
      if (userPanier) {
      const resultFind = userPanier.find(
        (el) => el.id === article._id && el.couleur === choixColor
      );

      //Si le produit es déja dans le panier on ajoute simplement la quantité
      if (resultFind) {
        let newQuantite = parseInt(product.quantite) + parseInt(resultFind.quantite);
        resultFind.quantite = newQuantite;
        localStorage.setItem("panier", JSON.stringify(userPanier));
        alert("Votre article à bien été ajouter au panier");

        //Sinon on ajoute le produit
      } else {
        userPanier.push(product);
        localStorage.setItem("panier", JSON.stringify(userPanier));
        alert("Votre article à bien été ajouter au panier");
      }

      //Si le panier n'existe pas on le créer puis on ajoute le nouveau produit
    } else {
      userPanier = [];
      userPanier.push(product);
      localStorage.setItem("panier", JSON.stringify(userPanier));
      alert("Votre article à bien été ajouter au panier");
    }
    }
    
  });
}
