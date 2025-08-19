export function renderCategory(name, description) {
  const div = document.createElement('div');
  div.classList.add('category-card');
  div.innerHTML = `
    <div class="category-header">
      <div>
        <h4 class="category-title">${name}</h4>
        <p class="category-label">${description || 'Sin descripción'}</p>
      </div>
    </div>
  `;
  document.getElementById('categories-grid').appendChild(div);
}

export function resetCategoryForm() {
  const form = document.getElementById('add-category-form');
  if (form) form.reset();
}
