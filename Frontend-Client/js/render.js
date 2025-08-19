import { elements } from './domElements.js';

// Renderizar las categorías dinámicamente
export function renderCategories(products, selectedCategory) {
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const allCategories = ["", ...uniqueCategories];

  elements.categoriesContainer.innerHTML = allCategories.map(cat => `
    <button 
      class="category-btn ${selectedCategory === cat ? "active" : ""}" 
      data-category="${cat}">
      ${cat === "" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  `).join("");
}

// Renderizar productos
export function renderProducts(list, onAddToCart) {
  if (list.length === 0) {
    elements.productsGrid.style.display = "none";
    elements.emptyState.style.display = "block";
    return;
  }

  elements.emptyState.style.display = "none";
  elements.productsGrid.style.display = "grid";

  elements.productsGrid.innerHTML = list.map(p => `
    <div class="product-card">
      <img src="${p.imageUrl ? '/' + p.imageUrl : "/placeholder.svg"}" alt="${p.name}">
      <div class="stock-badge ${p.stock > 0 ? "in-stock" : "out-of-stock"}">
        ${p.stock > 0 ? "En Stock" : "Agotado"}
      </div>
      <h3>${p.name}</h3>
      <p>Talla: ${p.size}</p>
      <p><strong>$${p.price.toFixed(2)}</strong></p>
      <p>Código: ${p.code}</p>
      <button class="add-to-cart-btn" ${p.stock === 0 ? "disabled" : ""} 
        data-id="${p._id}">
        ${p.stock === 0 ? "Agotado" : "Agregar al pedido"}
      </button>
    </div>
  `).join("");

  // Asignar eventos a los botones renderizados
  const buttons = elements.productsGrid.querySelectorAll('.add-to-cart-btn');
  buttons.forEach(button => {
    const id = button.dataset.id;
    button.addEventListener('click', () => {
      const producto = list.find(p => p._id === id);
      if (producto) onAddToCart(producto);
    });
  });
}

// Actualizar el contador de productos
export function updateProductsCount(list) {
  elements.productsCount.textContent = `${list.length} productos disponibles`;
}
