// Referencias de elementos
const proyectosContainer = document.getElementById('proyectos-container');
const addProjectButton = document.getElementById('add-project');
const deleteAllButton = document.getElementById('delete-all');
const toggleThemeButton = document.getElementById('toggle-theme');
let isDarkMode = false; // Estado del tema

// Cambiar Tema
toggleThemeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    toggleThemeButton.textContent = isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
});

// Función para agregar un proyecto
addProjectButton.addEventListener('click', () => {
    const name = document.getElementById('project-name').value.trim();
    const description = document.getElementById('project-description').value.trim();

    if (!name || !description) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Crear un nuevo proyecto
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.innerHTML = `
        <h2>${name}</h2>
        <p>${description}</p>
        <button class="delete-project">Eliminar</button>
    `;

  /*  // Agregar funcionalidad para eliminar
    projectDiv.querySelector('.delete-project').addEventListener('click', () => {
        projectDiv.remove();
    });*/

    proyectosContainer.appendChild(projectDiv);

    // Limpiar campos
    document.getElementById('project-name').value = '';
    document.getElementById('project-description').value = '';
});

/*// Función para eliminar todos los proyectos
deleteAllButton.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los proyectos?')) {
        proyectosContainer.innerHTML = '';
    }
});*/

// Función para cargar proyectos iniciales desde el JSON
const loadProjectsFromJSON = async () => {
    try {
        const response = await fetch('base.json');
        const data = await response.json();

        // Iterar sobre los proyectos en el JSON
        data.proyectos.forEach(proyecto => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
            projectDiv.innerHTML = `
                <h2>${proyecto.nombre}</h2>
                <p>${proyecto.descripcion}</p>
                <button class="delete-project">Eliminar</button>
            `;

            // Agregar funcionalidad para eliminar
            projectDiv.querySelector('.delete-project').addEventListener('click', () => {
                projectDiv.remove();
            });

            proyectosContainer.appendChild(projectDiv);
        });
    } catch (error) {
        console.error('Error al cargar proyectos desde el JSON:', error);
    }
};

// Cargar proyectos al iniciar la página
loadProjectsFromJSON();
