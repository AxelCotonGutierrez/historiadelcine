function showTagContent(tag) {
  suggestions.innerHTML = '';
  related.innerHTML = `<h3>Entradas con etiqueta: ${tag}</h3>`;

  // 👇 Comparación insensible a mayúsculas/tildes
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
