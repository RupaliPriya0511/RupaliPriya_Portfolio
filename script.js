// // Open Add Project Form
// function openForm() {
//     document.getElementById("project-form").style.display = "flex";
// }

// // Close Add Project Form
// function closeForm() {
//     document.getElementById("project-form").style.display = "none";
// }

// // Function to Add Project
// function addProject() {
//     let title = document.getElementById("title").value;
//     let date = document.getElementById("date").value;
//     let description = document.getElementById("description").value;
//     let link = document.getElementById("link").value;

//     if (title === "" || date === "" || description === "" || link === "") {
//         alert("All fields are required!");
//         return;
//     }

//     let project = { title, date, description, link };
    
//     // Store in Local Storage
//     let projects = JSON.parse(localStorage.getItem("projects")) || [];
//     projects.push(project);
//     localStorage.setItem("projects", JSON.stringify(projects));

//     // Add project to UI
//     addProjectToUI(project);

//     // Clear form fields
//     document.getElementById("title").value = "";
//     document.getElementById("date").value = "";
//     document.getElementById("description").value = "";
//     document.getElementById("link").value = "";

//     // Close form
//     closeForm();
// }

// // Function to Load Projects from Local Storage
// function loadProjects() {
//     let projects = JSON.parse(localStorage.getItem("projects")) || [];
//     projects.forEach(addProjectToUI);
// }

// // Function to Add Project Card to UI
// function addProjectToUI(project) {
//     let projectCard = document.createElement("div");
//     projectCard.classList.add("project-card");
//     projectCard.innerHTML = `
//         <h3>${project.title}</h3>
//         <p><strong>Completed On:</strong> ${project.date}</p>
//         <p>${project.description}</p>
//         <a href="${project.link}" target="_blank" class="view-btn">View Project</a>
//         <button class = "source" onclick = "requestSource(this)">Source</button>
//         <button class="remove-btn" onclick="requestDelete(this)">Remove</button>
//     `;

//     document.getElementById("project-list").appendChild(projectCard);
// }

// // Function to Request Deletion with Key
// function requestDelete(button) {
//     let key = prompt("Enter the delete key to remove this project:");
//     if (key === "Rupali@0511") {
//         // Remove from UI
//         let projectCard = button.parentElement;
//         let title = projectCard.querySelector("h3").innerText;

//         // Remove from Local Storage
//         let projects = JSON.parse(localStorage.getItem("projects")) || [];
//         projects = projects.filter(project => project.title !== title);
//         localStorage.setItem("projects", JSON.stringify(projects));

//         projectCard.remove();
//     } else {
//         alert("Incorrect key! You cannot delete this project.");
//     }
// }

// // Load Projects on Page Load
// window.onload = loadProjects;






const BASE_URL = 'http://localhost:5000';

//Open Add Project Form
function openForm() {
    document.getElementById("project-form").style.display = "flex";
}

// Close Add Project Form
function closeForm() {
    document.getElementById("project-form").style.display = "none";
}

async function addProject() {
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;
    let link = document.getElementById("link").value;
    let source = document.getElementById("source").value;
    let technologies = document.getElementById("technologies").value;

    if (!title || !date || !description || !link || !source||!technologies) {
        alert("All fields are required!");
        return;
    }

    const project = { title, date, description, link,source,technologies};
    
//     await fetch(`${BASE_URL}/projects`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(project)
//     });

//     addProjectToUI(project);

//     // Clear fields and close form
//     document.getElementById("title").value = "";
//     document.getElementById("date").value = "";
//     document.getElementById("description").value = "";
//     document.getElementById("link").value = "";
//     closeForm();




try {
    const response = await fetch(`${BASE_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
    });

    if (response.ok) {
        addProjectToUI(project);

        // ✅ Show success prompt
        alert("Project added successfully!");

        // Clear fields
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.getElementById("description").value = "";
        document.getElementById("link").value = "";
        document.getElementById("source").value = "";
        document.getElementById("technologies").value = "";

        closeForm();
    } else {
        alert("Error saving project to server.");
        }
    } catch (error) {
    console.error("Error:", error);
    alert("Server error while adding project.");
    }


}

// async function loadProjects() {
//     const res = await fetch(`${BASE_URL}/projects`);
//     const projects = await res.json();
//     projects.forEach(addProjectToUI);
// }

async function loadProjects() {
    try {
        const res = await fetch(`${BASE_URL}/projects`);
        const projects = await res.json();

        // Sort by date descending
        projects.sort((a, b) => new Date(b.date) - new Date(a.date));

        projects.forEach(addProjectToUI);
    } catch (error) {
        console.error("Error loading projects:", error);
        alert("Failed to load projects.");
    }
}


// <button class = "source" onclick = "requestSource(this)">Source</button>
// Function to Add Project Card to UI
function addProjectToUI(project) {
    let projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p><strong>Completed On:</strong> ${project.date}</p>
        <p><strong>Description:</strong>${project.description}</p>
        <p><strong>Technologies Used:</strong>${project.technologies}</p>
        <a href="${project.link}" target="_blank" class="view-btn">View Project</a>
        <a href="${project.source}" target="_blank" class="view-btn source-link">Source</a>
        
        <button class="remove-btn" onclick="requestDelete(this)">Remove</button>
    `;

    // document.getElementById("project-list").appendChild(projectCard);
    document.getElementById("project-list").prepend(projectCard);

}



async function requestDelete(button) {
    let key = prompt("Enter the delete key to remove this project:");
    if (key === "Rupali@0511") {
        let projectCard = button.parentElement;
        let title = projectCard.querySelector("h3").innerText;

        await fetch(`${BASE_URL}/projects/${encodeURIComponent(title)}`, {
            method: "DELETE"
        });

        projectCard.remove();
    } else {
        alert("Incorrect key!");
    }
}

window.onload = loadProjects;