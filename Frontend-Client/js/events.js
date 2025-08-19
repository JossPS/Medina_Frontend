import { elements } from './domElements.js';
import { updateCartUI } from './cart.js';

export function setupUIEvents() {
  // Mostrar carrito al hacer clic en el ícono
  elements.cartButton.addEventListener("click", () => {
    elements.cartSidebar.classList.add("open");
    elements.cartOverlay.classList.add("active");
  });

  // Cerrar carrito al hacer clic en la X o en el fondo oscuro
  elements.cartCloseBtn.addEventListener("click", closeCart);
  elements.cartOverlay.addEventListener("click", closeCart);

  // Inicializar visual del carrito al cargar la página
  document.addEventListener("DOMContentLoaded", () => {
    updateCartUI();
  });
}

function closeCart() {
  elements.cartSidebar.classList.remove("open");
  elements.cartOverlay.classList.remove("active");
}
