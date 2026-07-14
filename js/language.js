// LANGUAGE SYSTEM
const languageButtons = document.querySelectorAll(".lang-btn");

// Idioma guardado ou inglês por defeito
const savedLanguage = localStorage.getItem("language") || "en";

// Inicializar
setLanguage(savedLanguage);

// Eventos dos botões
languageButtons.forEach(button => {

    button.addEventListener("click", () => {

        setLanguage(button.dataset.lang);

    });

});


// SET LANGUAGE
function setLanguage(language) {

    // Guardar idioma
    localStorage.setItem("language", language);

    // Atualizar idioma do documento
    document.documentElement.lang = language;

    // Atualizar botão ativo
    languageButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );

    });

    // Traduzir textos
    document.querySelectorAll("[data-i18n]").forEach(element => {

        const value = getTranslation(language, element.dataset.i18n);

        if (value !== undefined) {

            element.textContent = value;

        }

    });

    // Traduzir atributos alt
    document.querySelectorAll("[data-i18n-alt]").forEach(element => {

        const value = getTranslation(language, element.dataset.i18nAlt);

        if (value !== undefined) {

            element.alt = value;

        }

    });

    // Traduzir placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const value = getTranslation(language, element.dataset.i18nPlaceholder);

        if (value !== undefined) {

            element.placeholder = value;

        }

    });

    // Traduzir titles
    document.querySelectorAll("[data-i18n-title]").forEach(element => {

        const value = getTranslation(language, element.dataset.i18nTitle);

        if (value !== undefined) {

            element.title = value;

        }

    });

    // Atualizar os projetos para o idioma escolhido
    if (typeof renderProjects === "function") {

        renderProjects();

    }

}


// GET TRANSLATION
function getTranslation(language, key) {

    return key
        .split(".")
        .reduce((object, property) => object?.[property], translations[language]);

}