document.addEventListener("DOMContentLoaded", function () {
    const headerHTML = `
        <header style="text-align: center;">
            <a href="https://axelcotongutierrez.github.io/historiadelcine/">
                <img src="https://axelcotongutierrez.github.io/historiadelcine/assets/images/top.jpg"
                     alt="Historia del Cine. Películas de dominio público"
                     style="max-width: 100%; height: auto; margin: 0 auto; display: block;" />
            </a>
        </header>
    `;

    const headerElement = document.createElement('div');
    headerElement.innerHTML = headerHTML;
    document.body.insertBefore(headerElement, document.body.firstChild);
});
