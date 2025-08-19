import { API } from '../services/api.js';
import { renderProductTable } from '../views/productView.js';

let editProductId = null;

export function initProductController() {
  loadProducts();

  window.addProduct = async () => {
    const formData = new FormData();
    formData.append('name', document.getElementById('product-name').value);
    formData.append('category', document.getElementById('product-category').value);
    formData.append('description', document.getElementById('product-description').value);
    formData.append('code', document.getElementById('product-model-code').value);
    formData.append('price', document.getElementById('product-price').value);
    formData.append('stock', document.getElementById('product-stock').value);
    formData.append('size', document.getElementById('product-sizes').value);
    formData.append('promotion', document.getElementById('product-promotion').checked);

    const imageFile = document.getElementById('product-image').files[0];
    if (imageFile) formData.append('imageUrl', imageFile);

    try {
      const response = editProductId
        ? await API.updateProduct(editProductId, formData)
        : await API.createProduct(formData);

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Error al guardar producto');

      document.getElementById('add-product-form').reset();
      closeModal('add-product-modal');
      editProductId = null;
      loadProducts();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert(error.message);
    }
  };

  window.openAddProductModal = () => {
    document.querySelector('#add-product-modal .modal-header h3').textContent = 'Agregar Nuevo Producto';
    document.getElementById('add-product-form').reset();
    editProductId = null;
    document.getElementById('add-product-modal').style.display = 'flex';
  };

  function handleEdit(product) {
    editProductId = product._id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-description').value = product.description;
    document.getElementById('product-model-code').value = product.code;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-sizes').value = product.size;
    document.getElementById('product-promotion').checked = product.promotion;
    document.querySelector('#add-product-modal .modal-header h3').textContent = 'Editar Producto';
    openAddProductModal();
  }

  async function handleDelete(productId) {
    if (!confirm('¿Deseas eliminar este producto?')) return;
    try {
      const res = await API.deleteProduct(productId);
      if (!res.ok) return alert('Error al eliminar');
      loadProducts();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }

  async function loadProducts() {
    try {
      const products = await API.fetchProducts();
      renderProductTable(products, handleEdit, handleDelete);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }
} 
