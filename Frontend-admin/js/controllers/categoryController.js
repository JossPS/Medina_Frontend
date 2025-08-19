import { renderCategory, resetCategoryForm } from '../views/categoryView.js';

export function initCategoryController() {
  window.openAddCategoryModal = () => {
    document.getElementById('add-category-form').reset();
    document.getElementById('add-category-modal').classList.add('show');
  };

  window.addCategory = () => {
    const name = document.getElementById('category-name').value;
    const desc = document.getElementById('category-description').value;

    if (!name.trim()) {
      alert('El nombre de la categoría es obligatorio.');
      return;
    }

    renderCategory(name, desc);
    resetCategoryForm();
    window.closeModal('add-category-modal');
  };
}
