function setLang(lang) {
  const langs = ['es', 'en'];
  langs.forEach(l => {
    document.querySelectorAll('.lang-' + l).forEach(el => {
      el.style.display = (l === lang) ? 'block' : 'none';
    });
  });

  // Guardar preferencia si se desea
  localStorage.setItem('preferedLang', lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem('preferedLang') || 'es';
  setLang(lang);
});
