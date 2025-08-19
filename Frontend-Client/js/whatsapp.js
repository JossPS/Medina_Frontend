import { elements } from './domElements.js';
import { WHATSAPP_NUMBER } from './config.js';
import { getCart, getCartTotal, clearCart } from './cart.js';

export function setupWhatsAppEvent() {
  elements.whatsappBtn.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    // Generar el mensaje del pedido
    let message = `🛍️ *Pedido nuevo de Variedades Medina*\n\n`;

    cart.forEach(producto => {
      message += `• ${producto.name}\n`;
      message += `  Código: ${producto.code}\n`;
      message += `  Talla: ${producto.size}\n`;
      message += `  Cantidad: ${producto.cantidad}\n`;
      message += `  Subtotal: $${(producto.price * producto.cantidad).toFixed(2)}\n\n`;
    });

    const total = getCartTotal();
    message += `💰 *Total: $${total.toFixed(2)}*\n`;

    // Generar link y abrir en nueva pestaña
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    // Vaciar carrito
    clearCart();
  });
}
