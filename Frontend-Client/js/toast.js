// js/toast.js
import { elements } from './domElements.js';

/**
 * Muestra una notificación flotante (toast)
 * @param {string} message - El mensaje a mostrar
 * @param {string} type - Tipo: 'success' o 'error'
 */
export function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="toast-icon ${type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i>
    <span class="toast-message">${message}</span>
  `;

  elements.toastContainer.appendChild(toast);

  // Mostrar animación
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Eliminar después de 3 segundos
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
