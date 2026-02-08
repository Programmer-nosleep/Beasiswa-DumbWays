// Main Application Entry Point
// This file imports and initializes all modules

import { projects } from './data.js';
import { renderProjects, initProjectListeners } from './projectCard.js';
import { initForm } from './projectForm.js';

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 App initialized');
    console.log(`📦 Loaded ${projects.length} projects`);

    // Initialize form handling
    initForm();

    // Initialize project listeners
    initProjectListeners();

    // Render project cards
    renderProjects();
});
