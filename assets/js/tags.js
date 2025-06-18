// ✅ Función global para redirigir a la página de etiquetas
function redirectToTagPage(tag) {
  localStorage.setItem('selectedTag', tag);
  window.location.href = '/historiadelcine/tags/';
}

// ✅ Función de normalización para comparar robusto
function normalizeTag(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quitar tildes
    .replace(/[\s\-]+/g, " ") // guiones y espacios como un solo espacio
    .trim();
}

// ✅ Main: después de cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.tag-search-container');
  const tags = JSON.parse(container.dataset.tags);
  const posts = JSON.parse(container.dataset.posts);

  const tagInput = document.getElementById('tagInput');
  const suggestions = document.getElementById('suggestions');
  const related = document.getElementById('related');

  // ⚡ Si viene de localStorage (clic en otra página)
  const selected = localStorage.getItem('selectedTag');
  if (selected) {
    showTagContent(selected);
    localStorage.removeItem('selectedTag');
  }

  // ⚡ Si viene con ?tag= (por si usas URL params en el futuro)
  const param = new URLSearchParams(window.location.search).get('tag');
  if (param) {
    showTagContent(param);
  }

  // ✅ Filtro dinámico en el input
  tagInput.addEventListener('input', function() {
    const query = normalizeTag(this.value);
    suggestions.innerHTML = '';
    related.innerHTML = '';

    if (query.length === 0) return;

    const filtered = tags.filter(tag => normalizeTag(tag).includes(query));
    filtered.forEach(tag => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.textContent = tag;
      div.onclick = () => showTagContent(tag);
      suggestions.appendChild(div);
    });
  });

  // ✅ Mostrar entradas para la etiqueta elegida
  function showTagContent(selectedTag) {
    suggestions.innerHTML = '';
    related.innerHTML = `<h3>Entradas con etiqueta: ${selectedTag}</h3>`;

    // Filtrar posts usando normalización
    const matching = posts.filter(p => 
      (p.tags || []).some(t => normalizeTag(t) === normalizeTag(selectedTag))
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
