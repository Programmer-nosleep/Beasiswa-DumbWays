// Project Card Component Module

import { projects, techIcons, removeProject, getProjectById } from './data.js';
import { formatDuration, showNotification } from './utils.js';

// Create project card HTML
export function createProjectCard(project) {
    const duration = formatDuration(project.startDate, project.endDate);
    const techIconsHtml = project.technologies.map(tech => {
        const iconUrl = techIcons[tech];
        return iconUrl ? `
            <span class="tech-icon" title="${tech}">
                <img src="${iconUrl}" alt="${tech}">
            </span>
        ` : '';
    }).join('');

    return `
        <div class="col-lg-4 col-md-6">
            <div class="project-card" data-id="${project.id}">
                <img src="${project.image}" alt="${project.name}" class="project-card-img">
                <div class="project-card-body">
                    <h5 class="project-card-title">${project.name}</h5>
                    <p class="project-card-duration">${duration}</p>
                    <p class="project-card-desc">${project.description}</p>
                    <div class="tech-icons">
                        ${techIconsHtml}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-card-action btn-edit" data-id="${project.id}">edit</button>
                        <button class="btn btn-card-action btn-delete" data-id="${project.id}">delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render all projects
export function renderProjects() {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;

    projectGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');

    // Event listeners are handled via delegation in initProjectListeners
}

// Initialize project listeners (Event Delegation)
export function initProjectListeners() {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;

    projectGrid.addEventListener('click', (e) => {
        const target = e.target;

        // Handle Edit Button Click
        if (target.classList.contains('btn-edit')) {
            const id = parseInt(target.dataset.id);
            editProject(id);
        }

        // Handle Delete Button Click
        if (target.classList.contains('btn-delete')) {
            const id = parseInt(target.dataset.id);
            deleteProject(id);
        }
    });
}

// Edit project
export function editProject(id) {
    const project = getProjectById(id);
    if (!project) return;

    // Populate form with project data
    document.getElementById('projectName').value = project.name;
    document.getElementById('startDate').value = project.startDate;
    document.getElementById('endDate').value = project.endDate;
    document.getElementById('description').value = project.description;

    // Check technologies
    document.querySelectorAll('.tech-checkbox').forEach(checkbox => {
        checkbox.checked = project.technologies.includes(checkbox.value);
    });

    // Remove the project from array
    removeProject(id);

    // Re-render
    renderProjects();

    // Scroll to form
    document.querySelector('.add-project-section').scrollIntoView({ behavior: 'smooth' });

    showNotification('Edit the project and submit to save changes.', 'info');
}

// Delete project
export function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        removeProject(id);
        renderProjects();
        showNotification('Project deleted successfully!', 'success');
    }
}
