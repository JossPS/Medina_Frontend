export function renderLinksTable(enlaces, onCopy) {
  const tbody = document.getElementById('links-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  enlaces.forEach((e, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${e.nombre}</td>
      <td>${e.productos.map(p => p.nombre).join(', ')}</td>
      <td><button class="btn btn-outline" data-index="${i}">Copiar</button></td>
    `;
    const button = row.querySelector('button');
    button.addEventListener('click', () => onCopy(i));
    tbody.appendChild(row);
  });
} 
