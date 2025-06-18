// ✅ Redirigir a /tags/ con LocalStorage
function redirectToTagPage(tag) {
  localStorage.setItem('selectedTag', tag);
  window.location.href = '/historiadelcine/tags/';
}

// ✅ Función global unificada
function showTagContent(tag) {
  console.log("Mostrando contenido para:", tag);
// ✅ Función para redirigir con etiqueta ORIGINAL
function redirectToTagPage(tag) {
  localStorage.setItem('selectedTag', tag);
  window.location.href = '/historiadelcine/tags/';
}

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.tag-search-container');
  const tags = JSON.parse(container.dataset.tags);
  const posts = JSON.parse(container.dataset.posts);
  const tagInput = document.getElementById('tagInput');
  const suggestions = document.getElementById('suggestions');
  const related = document.getElementById('related');

  // Si viene de localStorage:
  const selected = localStorage.getItem('selectedTag');
  if (selected) {
    showTagContent(selected);
    localStorage.removeItem('selectedTag');
  }

  // Si viene como ?tag=...
  const param = new URLSearchParams(window.location.search).get('tag');
  if (param) {
    showTagContent(param); // usa tal cual
  }

  tagInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    suggestions.innerHTML = '';
    related.innerHTML = '';

    if (query.length === 0) return;

    const filtered = tags.filter(tag => tag.toLowerCase().includes(query));
    filtered.forEach(tag => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.textContent = tag;
      div.onclick = () => showTagContent(tag);
      suggestions.appendChild(div);
    });
  });

  function showTagContent(tag) {
    suggestions.innerHTML = '';
    related.innerHTML = `<h3>Entradas con etiqueta: ${tag}</h3>`;

    const matching = posts.filter(p => p.tags.includes(tag));
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

  const container = document.querySelector('.tag-search-container');
  const tags = JSON.parse(container.dataset.tags);
  const posts = JSON.parse(container.dataset.posts);

  const suggestions = document.getElementById('suggestions');
  const related = document.getElementById('related');

  if (suggestions) suggestions.innerHTML = '';
  if (related) {
    related.innerHTML = `<p class="titulo-h3">Entradas con etiqueta: ${tag}</p>`;

    const matching = posts.filter(p => p.tags.includes(tag));
    if (matching.length === 0) {
      related.innerHTML += '<p>No hay entradas para esta etiqueta.</p>';
      return;
    }

    const ul = document.createElement('ul');
    matching.forEach(p => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '{{ site.baseurl }}' + p.url;
      a.textContent = p.title;
      li.appendChild(a);
      ul.appendChild(li);
    });
    related.appendChild(ul);
  }
}

// ✅ On DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Si viene de LocalStorage
  const selectedTag = localStorage.getItem('selectedTag');
  if (selectedTag) {
    showTagContent(selectedTag);
    localStorage.removeItem('selectedTag');
  }

  // Si viene como ?tag=...
  const urlParams = new URLSearchParams(window.location.search);
  const tagParam = urlParams.get('tag');
  if (tagParam) {
    showTagContent(tagParam);
  }

  // Si existe input, activa autocompletado + redirección
  const tagInput = document.getElementById('tagInput');
  if (tagInput) {
    const container = document.querySelector('.tag-search-container');
    const tags = JSON.parse(container.dataset.tags);

    const suggestions = document.getElementById('suggestions');

    tagInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      suggestions.innerHTML = '';
      if (query.length === 0) return;

      const filtered = tags.filter(tag => tag.toLowerCase().includes(query));

      filtered.forEach(tag => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = tag;
        div.onclick = () => redirectToTagPage(tag);
        suggestions.appendChild(div);
      });
    });
  }
});
