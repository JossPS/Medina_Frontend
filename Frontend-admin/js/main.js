import { checkAuthOrRedirect } from './auth.js';
import { initProductController } from './controllers/productController.js';
import { initCategoryController } from './controllers/categoryController.js';
import { initLinkController } from './controllers/linkController.js';
import { initWhatsAppController } from './controllers/whatsappController.js';

// Navegación de secciones
function initSectionsNav() {
  const navButtons = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  const sectionTitle = document.getElementById('section-title');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const sectionToShow = button.getAttribute('data-section');
      sectionTitle.textContent = button.textContent.trim();
      sections.forEach(section => section.classList.remove('active'));
      document.getElementById(`${sectionToShow}-section`).classList.add('active');
    });
  });
}

(async () => {
  const user = await checkAuthOrRedirect();
  if (!user) return; // redirigido

  initSectionsNav();
  initProductController();
  initCategoryController();
  initLinkController();
  initWhatsAppController();
})();
