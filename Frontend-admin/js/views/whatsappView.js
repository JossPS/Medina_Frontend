export function populateCatalogSelect(enlaces) {
  const select = document.getElementById('catalog-select');
  if (!select) return;

  select.innerHTML = '<option value="">Selecciona un catálogo</option>';

  enlaces.forEach(e => {
    const option = document.createElement('option');
    option.value = e.enlace;
    option.textContent = e.nombre;
    select.appendChild(option);
  });
}

export function resetWhatsAppForm() {
  const form = document.getElementById('whatsapp-form');
  if (form) form.reset();
}
