// PROJECTS
let projects = [];

// INITIALIZATION
document.addEventListener("DOMContentLoaded", async () => {

    await loadProjects();

});

// LOAD PROJECTS
async function loadProjects() {

    try {

        const response = await fetch("data/projects.json");

        projects = await response.json();

        renderProjects();

    }

    catch (error) {

        console.error("Error loading projects:", error);

    }

}

// RENDER PROJECTS
function renderProjects() {

    const container = document.getElementById("projects-container");

    if (!container) return;

    container.innerHTML = "";

    const language = document.documentElement.lang || "en";

    const teamLabel = translations[language].projects.team;
    const githubLabel = "GitHub";
    const statementLabel = translations[language].projects.statement;

    projects.forEach(project => {

        const technologies = project.technologies
            .map(technology => `<span class="tech">${technology}</span>`)
            .join("");

        const members = project.members
            .map(member => `<li>• ${member}</li>`)
            .join("");

        const statementButton = project.statement
            ? `
                <a
                    href="${project.statement}"
                    target="_blank"
                    rel="noopener noreferrer">

                    ${statementLabel}

                </a>
              `
            : "";

        const card = document.createElement("article");

        card.className = "project-card";

        card.innerHTML = `

            <img
                src="${project.image}"
                alt="${project.title[language]}">

            <div class="project-content">

                <h3>${project.title[language]}</h3>

                <p>${project.description[language]}</p>

                <div class="tech-list">

                    ${technologies}

                </div>

                <div class="project-members">

                    <h4>${teamLabel}</h4>

                    <ul>

                        ${members}

                    </ul>

                </div>

                <div class="project-links">

                    <a
                        href="${project.github}"
                        target="_blank"
                        rel="noopener noreferrer">

                        ${githubLabel}

                    </a>

                    ${statementButton}

                </div>

            </div>

        `;

        container.appendChild(card);

    });

}