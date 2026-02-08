// Project Data Module

// Sample project data
export let projects = [
    {
        id: 1,
        name: "Dumbways Mobile App - 2021",
        startDate: "2021-01-01",
        endDate: "2021-06-30",
        description: "App that users for dumbways student, it was made to connect and communicated on peoples. Happy download!",
        technologies: ["Node Js", "React Js", "Next Js", "TypeScript"],
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Dumbways Mobile App - 2021",
        startDate: "2021-07-01",
        endDate: "2021-12-31",
        description: "App that users for dumbways student, it was made to connect and communicated on peoples. Happy download!",
        technologies: ["Node Js", "React Js"],
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Dumbways Mobile App - 2020",
        startDate: "2020-01-01",
        endDate: "2020-06-30",
        description: "App that users for dumbways student, it was made to connect and communicated on peoples. Happy download!",
        technologies: ["TypeScript", "Next Js"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Dumbways Mobile App - 2022",
        startDate: "2022-01-01",
        endDate: "2022-06-30",
        description: "App that users for dumbways student, it was made to connect and communicated on peoples. Happy download!",
        technologies: ["Node Js", "Next Js"],
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Dumbways Web App - 2021",
        startDate: "2021-03-01",
        endDate: "2021-09-30",
        description: "App that users for dumbways student, it was made to connect and communicated on peoples. Happy download!",
        technologies: ["React Js", "TypeScript"],
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop"
    }
];

// Technology icon mapping
export const techIcons = {
    "Node Js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "Next Js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "React Js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
};

// Add project to array (Functional Approach: Immutable update)
export function addProject(project) {
    projects = [project, ...projects];
}

// Remove project from array (Functional Approach: Filtering)
export function removeProject(id) {
    projects = projects.filter(p => p.id !== id);
}

// Get project by id
export function getProjectById(id) {
    return projects.find(p => p.id === id);
}
