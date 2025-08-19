import { renderLinksTable } from '../views/linkView.js';

let enlacesGenerados = [];

export function initLinkController() {
  window.openCreateLinkModal = async () => {
    const modal = document.getElementById('create-link-modal');
    modal.style.display = 'flex';

    const selectionContainer = document.getElementById('product-selection');
    selectionContainer.innerHTML = '<p>Cargando productos...</p>';

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:9000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productos = await res.json();

      selectionContainer.innerHTML = productos.map(p => `
        <label class="checkbox-inline">
          <input type="checkbox" value="${p._id}" data-nombre="${p.name}"> ${p.name}
        </label>
      `).join('');
    } catch (err) {
      selectionContainer.innerHTML = '<p>Error al cargar productos</p>';
    }
  };

  window.createLink = () => {
    const nombre = document.getElementById('link-name').value;
    const checkboxes = document.querySelectorAll('#product-selection input[type="checkbox"]:checked');
    const mensaje = document.getElementById('custom-message').value;

    if (!nombre || checkboxes.length === 0) {
      alert('Completa el nombre del enlace y selecciona al menos un producto.');
      return;
    }

    const productos = Array.from(checkboxes).map(c => ({ id: c.value, nombre: c.dataset.nombre }));
    //const enlace = `https://medinavarity.com/catalogo?ref=${encodeURIComponent(nombre.trim().toLowerCase().replace(/\s+/g, '-')}`;

    const nuevoEnlace = { nombre, productos, enlace, mensaje };
    enlacesGenerados.push(nuevoEnlace);
    renderLinksTable(enlacesGenerados, copiarEnlace);

    document.getElementById('create-link-form').reset();
    closeModal('create-link-modal');
  };

  window.copiarEnlace = (index) => {
    const enlace = enlacesGenerados[index].enlace;
    navigator.clipboard.writeText(enlace)
      .then(() => alert('Enlace copiado al portapapeles'))
      .catch(() => alert('Error al copiar el enlace'));
  };
} 
