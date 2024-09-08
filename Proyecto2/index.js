import { products } from "./data.js";
//menu desplegable
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
})
cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
})

// inyectar el modal
const modalHTML = `
    <div id="filter-modal" class="modal">
      <div class="modal-content">
       
        <h2>Buscar productos</h2>
         <span id="close-modal" class="close">&times;</span>
        <form id="filters-form">
          <label for="category">Categoría:</label>
          <select id="category">
            <option value="">Todas</option>
            <option value="ropa">Ropa</option>
            <option value="pienso_perros">Pienso perros</option>
            <option value="juguetes">Juguetes</option>
            <option value="pienso_gatos">Pienso gatos</option>
            <option value="antiparasitarios">Antiparasitarios</option>
            <option value="chuches">Snack</option>
            <option value="comida_humeda">Latas comida</option>
            <option value="transportines">Transportines</option>
            
          </select>
          <div class="rangos">
          <label for="price-range">Rango de Precio:</label>
          <div class="input"><input type="number" id="min-price" placeholder="Mínimo">
          <input type="number" id="max-price" placeholder="Máximo"></div>

          <button type="submit">Aplicar Filtros</button>
          <button type="button" id="clear-filters">Limpiar Filtros</button>
          </div>
        </form>
      </div>
    </div>
  `;
document.body.insertAdjacentHTML('beforeend', modalHTML);

const modal = document.getElementById('filter-modal');
const openModalButton = document.getElementById('open-filters');
const closeModalButton = document.getElementById('close-modal');
const filtersForm = document.getElementById('filters-form');
const clearFiltersButton = document.getElementById('clear-filters');
const productsContainer = document.getElementById('products-container');

// función para abrir y cerrar el modal
openModalButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// se pintan los elementos en el html
function displayProducts(productsToDisplay) {
  productsContainer.innerHTML = '';
  productsToDisplay.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <h4>Precio: ${product.price.toFixed(2)} €</h4>
      `;
    productsContainer.appendChild(productCard);
  });
}

// se filtran
filtersForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const category = document.getElementById('category').value;
  const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
  const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

  const filteredProducts = products.filter(product => {
    return (category === '' || product.category === category) &&
      product.price >= minPrice &&
      product.price <= maxPrice;
  });

  productsContainer.innerHTML = '';

  if (filteredProducts.length > 0) {
    displayProducts(filteredProducts);
  } else {
    const suggestedProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);
    displayProducts(suggestedProducts);
    const message = document.createElement('div');
    message.innerHTML = `No se encontró lo que buscas, pero te sugerimos estos productos`;
    productsContainer.appendChild(message);
  }

  modal.style.display = 'none';
});




// Limpiar filtros
clearFiltersButton.addEventListener('click', () => {
  document.getElementById('category').value = '';
  document.getElementById('min-price').value = '';
  document.getElementById('max-price').value = '';
  displayProducts(products);
});

// Pintar todos los productos al cargar la página
displayProducts(products);
