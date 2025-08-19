// js/cart.js
import { elements } from './domElements.js';
import { showToast } from './toast.js';

let cart = [];

// Obtener el carrito actual
export function getCart() {
  return cart;
}

// Añadir un producto al carrito
export function addToCart(producto) {
  const index = cart.findIndex(p => p._id === producto._id);

  if (index !== -1) {
    if (cart[index].cantidad < producto.stock) {
      cart[index].cantidad++;
    } else {
      showToast("No hay más stock disponible", "error");
      return;
    }
  } else {
    cart.push({ ...producto, cantidad: 1 });
  }

  updateCartUI();
  showToast("Producto agregado", "success");
}

// Modificar cantidad (suma o resta)
export function updateQuantity(index, delta) {
  cart[index].cantidad += delta;
  if (cart[index].cantidad <= 0) {
    cart.splice(index, 1);
  }
  updateCartUI();
}

// Eliminar un producto del carrito
export function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Calcular el total del carrito
export function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.cantidad, 0);
}

// Renderizar el carrito visualmente
export function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.cantidad, 0);
  elements.cartCount.textContent = count;
  elements.cartCount.style.display = count > 0 ? "flex" : "none";

  if (cart.length === 0) {
    elements.cartItems.innerHTML = "";
    elements.cartEmpty.style.display = "block";
    elements.whatsappBtn.style.display = "none";
    elements.cartTotal.textContent = "$0.00";
    return;
  }

  elements.cartEmpty.style.display = "none";
  elements.whatsappBtn.style.display = "block";

  elements.cartItems.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <h4>${item.name}</h4>
      <p class="product-code">Código: ${item.code}</p>
      <p>Talla: ${item.size} | $${item.price.toFixed(2)} c/u</p>
      <div class="item-controls">
        <button class="quantity-minus" data-index="${i}">−</button>
        <span>${item.cantidad}</span>
        <button class="quantity-plus" data-index="${i}">+</button>
        <button class="remove-item" data-index="${i}">🗑️</button>
      </div>
    </div>
  `).join("");

  elements.cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;

  // Asignar eventos
  elements.cartItems.querySelectorAll(".quantity-minus").forEach(btn => {
    btn.addEventListener("click", () => updateQuantity(btn.dataset.index, -1));
  });

  elements.cartItems.querySelectorAll(".quantity-plus").forEach(btn => {
    btn.addEventListener("click", () => updateQuantity(btn.dataset.index, 1));
  });

  elements.cartItems.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.index));
  });
}

// Vaciar el carrito (después de enviar por WhatsApp)
export function clearCart() {
  cart = [];
  updateCartUI();
}
// Inicializar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
elements.cartButton.addEventListener("click", () => {
  elements.cartSidebar.classList.toggle("active");
  elements.cartOverlay.classList.toggle("active");
});