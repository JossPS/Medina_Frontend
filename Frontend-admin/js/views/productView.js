export function renderProductTable(products, onEdit, onDelete) {
  const tableBody = document.getElementById('products-table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="http://localhost:9000/${product.imageUrl}" style="width: 50px; height: auto; border-radius: 6px;"></td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.size}</td>
      <td>$${product.price}</td>
      <td>${product.stock}</td>
      <td>${product.promotion ? 'Promoción' : 'Normal'}</td>
      <td>${product.code}</td>
      <td>
        <button class="btn btn-outline btn-edit">Editar</button>
        <button class="btn btn-outline btn-delete">Eliminar</button>
      </td>
    `;

    row.querySelector('.btn-edit').addEventListener('click', () => onEdit(product));
    row.querySelector('.btn-delete').addEventListener('click', () => onDelete(product._id));

    tableBody.appendChild(row);
  });
}
