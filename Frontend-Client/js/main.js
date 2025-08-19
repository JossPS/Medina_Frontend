import { fetchProducts } from './productService.js';
import { renderCategories, renderProducts, updateProductsCount } from './render.js';
import { setupUIEvents } from './events.js';
import { setupWhatsAppEvent } from './whatsapp.js';
import { showToast } from './toast.js';
import { addToCart } from './cart.js';
import { elements } from './domElements.js';

let products = [];
let selectedCategory = "";
let searchTerm = "";

// Filtro y búsqueda
function filterAndRender() {
  const filtered = products.filter(p => {
    const matchCat = selectedCategory === "" || p.category === selectedCategory;
    const matchText = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchText;
  });

  renderProducts(filtered, addToCart);
  updateProductsCount(filtered);
}

// Selección de categoría
function setupCategoryFilter() {
  elements.categoriesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("category-btn")) {
      selectedCategory = e.target.dataset.category;
      document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      filterAndRender();
    }
  });
}

// Input de búsqueda
function setupSearchFilter() {
  elements.searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    filterAndRender();
  });
}

// Inicialización general
async function initCatalog() {
  try {
    showLoading();

    products = await fetchProducts();
    renderCategories(products, selectedCategory);
    renderProducts(products, addToCart);
    updateProductsCount(products);

    setupCategoryFilter();
    setupSearchFilter();
    setupUIEvents();
    setupWhatsAppEvent();

  } catch (error) {
    console.error(error);
    showToast("Error al cargar productos", "error");
    elements.productsGrid.style.display = "none";
    elements.emptyState.style.display = "block";
  } finally {
    hideLoading();
  }
}

// Loading
function showLoading() {
  if (elements.loadingScreen) elements.loadingScreen.style.display = "flex";
}
function hideLoading() {
  if (elements.loadingScreen) elements.loadingScreen.style.display = "none";
}

// Lanzar app
initCatalog();
