//Appel de la fonction principale
main();
//Déclaration de la fonction main
async function main() {
  const articles = await getArticles();

  for (let article of articles) {
    displayArticle(article);
  }
}  

//Récupération de la liste  d'articles depuis l'API
async function getArticles() {
  return await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((articles) => articles)
    .catch((error) => alert("Une erreure es survenue avec L'API"));
}

//Apparition des articles de l'API dynamiquement
function displayArticle(article) {
  document.getElementById("items").innerHTML += `
  <a href="./product.html?id=${article._id}">
  <article>
    <img src="${article.imageUrl}" alt="${article.altTxt}">
    <h3 class="productName">${article.name}</h3>
    <p class="productDescription">${article.description}</p>
  </article>
</a>`;
}
