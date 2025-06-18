// ✅ Función para manejar redirección a /tags/ con localStorage
function redirectToTagPage(tag) {
  localStorage.setItem('selectedTag', tag);
  window.location.href = '/historiadelcine/tags/';
}

// ✅ Al cargar la página de /tags/
document.addEventListener('DOMContentLoaded', function() {
  // 1️⃣ Si viene de localStorage
  var selectedTagLocalStorage = localStorage.getItem('selectedTag');
  if (selectedTagLocalStorage) {
    showTagContent(selectedTagLocalStorage);
    localStorage.removeItem('selectedTag'); // Limpia
  }

  // 2️⃣ Si viene por parámetro GET ?tag=
  var urlParams = new URLSearchParams(window.location.search);
  var tagParam = urlParams.get('tag');
  if (tagParam) {
    showTagContent(tagParam);
  }

  // 3️⃣ Si existe input con id=tagInput (modo sugerencias)
  const tagInput = document.getElementById('tagInput');
  const suggestions = document.getElementById('suggestions');
  const related = document.getElementById('related');

  if (tagInput) {
    // Datos de etiquetas y posts vienen incrustados en el contenedor
    const container = document.querySelector('.tag-search-container');
    const tags = JSON.parse(container.dataset.tags);
    const posts = JSON.parse(container.dataset.posts);

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
        // ✅ Usa la redirección normal
        div.onclick = () => redirectToTagPage(tag);
        suggestions.appendChild(div);
      });
    });

    // Sobreescribe showTagContent para que funcione en el input + fichas
    window.showTagContent = function(tag) {
      suggestions.innerHTML = '';
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
    };
  } else {
    // ✅ Si no hay input, define fallback para modo clásico
    window.showTagContent = function(tagSlug) {
      console.log("Mostrando contenido para:", tagSlug);
      var selectedDiv = document.getElementById(tagSlug);
      if (selectedDiv) {
        var relatedPostsDivs = document.querySelectorAll('.related-posts');
        relatedPostsDivs.forEach(function(div) {
          div.style.display = 'none';
        });
        selectedDiv.style.display = 'block';
      } else {
        console.log("Div no encontrado para:", tagSlug);
      }
    };
  }
});

// ✅ Slugify global si lo necesitas en otro sitio
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Espacios a guiones
    .replace(/º/g, '-º')            
    .replace(/[^\w\-ºáéíóúÁÉÍÓÚñÑ]+/g, '') 
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}
