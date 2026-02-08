// Project Form Component Module

import { addProject } from './data.js';
import { showNotification } from './utils.js';
import { renderProjects } from './projectCard.js';

// DOM Elements
let projectForm;
let projectImage;
let fileName;

// Initialize form
export function initForm() {
    projectForm = document.getElementById('projectForm');
    projectImage = document.getElementById('projectImage');
    fileName = document.getElementById('fileName');

    if (!projectForm) return;

    setupFormEventListeners();
}

// Setup form event listeners
function setupFormEventListeners() {
    // Form submit
    projectForm.addEventListener('submit', handleFormSubmit);

    // File input change
    if (projectImage) {
        projectImage.addEventListener('change', handleFileChange);
    }
}

// Handle file selection
function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && fileName) {
        fileName.textContent = file.name;
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('projectName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const description = document.getElementById('description').value;

    // Get selected technologies (Functional Approach: map & Array.from)
    const technologies = Array.from(document.querySelectorAll('.tech-checkbox:checked'))
        .map(checkbox => checkbox.value);

    // Get image (if any)
    const imageFile = projectImage?.files[0];
    let imageUrl = "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop";

    if (imageFile) {
        imageUrl = URL.createObjectURL(imageFile);
    }

    // Create new project
    const newProject = {
        id: Date.now(),
        name: name,
        startDate: startDate,
        endDate: endDate,
        description: description,
        technologies: technologies,
        image: imageUrl
    };

    // Add to projects array
    addProject(newProject);

    // Re-render projects
    renderProjects();

    // Reset form
    projectForm.reset();
    if (fileName) {
        fileName.textContent = '';
    }

    // Show success message
    showNotification('Project added successfully!', 'success');
}
