// ✅ HACER GLOBAL la redirección para usarla en onclick
window.redirectToTagPage = function(tag) {
  localStorage.setItem('selectedTag', tag);
  window.location.href = '/historiadelcine/tags/';
};

// ✅ SLUGIFY si quieres normalizar (opcional, usado para coincidencia estricta)
window.slugify = function(text) {
  return text.toString().toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Espacios → guiones
    .replace(/[^\w\-áéíóúñü]/g, '') // Solo letras, números, guiones
    .replace(/\-\-+/g, '-')         // Varios guiones → uno solo
    .replace(/^-+/, '')             // Sin guión al inicio
    .replace(/-+$/, '');            // Sin guión al final
};

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.tag-search-container');
  if (!container) return; // seguridad

  const tags = JSON.parse(container.dataset.tags);
  const posts = JSON.parse(container.dataset.posts);

  const tagInput = document.getElementById('tagInput');
  const suggestions = document.getElementById('suggestions');
  const related = document.getElementById('related');

  // ✅ Si viene de localStorage, mostrar
  const selectedTagLocalStorage = localStorage.getItem('selectedTag');
  if (selectedTagLocalStorage) {
    showTagContent(selectedTagLocalStorage);
    localStorage.removeItem('selectedTag');
  }

  // ✅ Si viene de ?tag=... (opcional, por robustez)
  const urlParams = new URLSearchParams(window.location.search);
  const tagParam = urlParams.get('tag');
  if (tagParam) {
    showTagContent(tagParam);
  }

  // ✅ Buscar mientras escribes
  tagInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    suggestions.innerHTML = '';
    related.innerHTML = '';

    if (query.length === 0) return;

    const filtered = tags.filter(tag =>
      tag.toLowerCase().includes(query)
    );

    filtered.forEach(tag => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.textContent = tag;
      div.onclick = () => showTagContent(tag);
      suggestions.appendChild(div);
    });
  });

  // ✅ Mostrar entradas para una etiqueta
  function showTagContent(tag) {
    suggestions.innerHTML = '';
    related.innerHTML = `<h3>Entradas con etiqueta: ${tag}</h3>`;

    const matching = posts.filter(p =>
      p.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );

    if (matching.length === 0) {
      related.innerHTML += '<p>No hay entradas para esta etiqueta.</p>';
      return;
    }

    const ul = document.createElement('ul');
    matching.forEach(p => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.url;
      a.textContent = p.title;
      li.appendChild(a);
      ul.appendChild(li);
    });
    related.appendChild(ul);
  }
});
