const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("theme");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

setTheme(currentTheme);

themeToggle.addEventListener("click", () => {

    const newTheme =
        document.documentElement.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark";

    setTheme(newTheme);

});

function setTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

    themeIcon.src =
        theme === "dark"
            ? "assets/icons/sun.png"
            : "assets/icons/moon.png";

    themeIcon.alt =
        theme === "dark"
            ? "Light mode"
            : "Dark mode";

}