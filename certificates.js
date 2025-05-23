// // Function to Open the Add Certificate Form
// function openForm() {
//     document.getElementById("certificate-form").style.display = "flex";
// }

// // Function to Close the Add Certificate Form
// function closeForm() {
//     document.getElementById("certificate-form").style.display = "none";
// }

// // Function to Add a New Certificate
// function addCertificate() {
//     // Get input values from form fields
//     let title = document.getElementById("title").value;
//     let date = document.getElementById("date").value;
//     let description = document.getElementById("description").value;
//     let link = document.getElementById("link").value;

//     // Validate that no field is empty
//     if (title === "" || date === "" || description === "" || link === "") {
//         alert("All fields are required!");
//         return;
//     }

//     // Create a certificate object
//     let certificate = { title, date, description, link };
    
//     // Retrieve existing certificates from localStorage or create an empty array
//     let certificates = JSON.parse(localStorage.getItem("certificates")) || [];
    
//     // Add the new certificate to the array
//     certificates.push(certificate);
    
//     // Store the updated list in localStorage
//     localStorage.setItem("certificates", JSON.stringify(certificates));

//     // Add the certificate to the UI
//     addCertificateToUI(certificate);

//     // Clear form fields after adding the certificate
//     document.getElementById("title").value = "";
//     document.getElementById("date").value = "";
//     document.getElementById("description").value = "";
//     document.getElementById("link").value = "";

//     // Close the form
//     closeForm();
// }

// // Function to Load Certificates from Local Storage on Page Load
// function loadCertificates() {
//     let certificates = JSON.parse(localStorage.getItem("certificates")) || [];
//     certificates.forEach(addCertificateToUI);
// }

// // Function to Add Certificate Card to UI
// function addCertificateToUI(certificate) {
//     // Create a new div element for the certificate card
//     let certificateCard = document.createElement("div");
//     certificateCard.classList.add("certificate-card");

//     // Set the inner HTML structure of the certificate card
//     certificateCard.innerHTML = `
//         <h3>${certificate.title}</h3>
//         <p><strong>Issued On:</strong> ${certificate.date}</p>
//         <p>${certificate.description}</p>
//         <a href="${certificate.link}" target="_blank" class="view-btn">View Certificate</a>
//         <button class="remove-btn" onclick="requestDelete(this)">Remove</button>
//     `;

//     // Append the newly created card to the certificate list container
//     document.getElementById("certificate-list").appendChild(certificateCard);
// }

// // Function to Request Deletion with a Confirmation Key
// function requestDelete(button) {
//     let key = prompt("Enter the delete key to remove this certificate:");
//     if (key === "Rupali@0511") { // Change this key if needed
        
//         // Get the parent certificate card element
//         let certificateCard = button.parentElement;
//         let title = certificateCard.querySelector("h3").innerText;

//         // Remove from Local Storage
//         let certificates = JSON.parse(localStorage.getItem("certificates")) || [];
//         certificates = certificates.filter(certificate => certificate.title !== title);
//         localStorage.setItem("certificates", JSON.stringify(certificates));

//         // Remove the certificate card from the UI
//         certificateCard.remove();
//     } else {
//         alert("Incorrect key! You cannot delete this certificate.");
//     }
// }

// // Load Certificates from Local Storage when the page loads
// window.onload = loadCertificates;











// const BASE_URL = 'http://localhost:5000';
// // Function to Open the Add Certificate Form
// function openForm() {
//     document.getElementById("certificate-form").style.display = "flex";
// }

// // Function to Close the Add Certificate Form
// function closeForm() {
//     document.getElementById("certificate-form").style.display = "none";
// }

// // Function to Add a New Certificate
// async function addCertificate() {
//     // Get input values from form fields
//     let title = document.getElementById("title").value;
//     let date = document.getElementById("date").value;
//     let org = document.getElementById("org").value;
//     let description = document.getElementById("description").value;
//     let link = document.getElementById("link").value;

//     // Validate that no field is empty
//     if (title === "" || date === "" || org === "" || description === "" || link === "") {
//         alert("All fields are required!");
//         return;
//     }

//     // Create a certificate object
//     const  certificate = { title, date, org, description, link };
    
//     // Retrieve existing certificates from localStorage or create an empty array
//     // let certificates = JSON.parse(localStorage.getItem("certificates")) || [];
    
//     // Add the new certificate to the array
//     certificates.push(certificate);
    
//     // Store the updated list in localStorage
//     localStorage.setItem("certificates", JSON.stringify(certificates));

//     // Add the certificate to the UI
//     addCertificateToUI(certificate);

//     // Clear form fields after adding the certificate
//     document.getElementById("title").value = "";
//     document.getElementById("date").value = "";
//     document.getElementById("org").value = "";
//     document.getElementById("description").value = "";
//     document.getElementById("link").value = "";

//     // Close the form
//     closeForm();
// }

// // Function to Load Certificates from Local Storage on Page Load
// function loadCertificates() {
//     let certificates = JSON.parse(localStorage.getItem("certificates")) || [];
//     certificates.forEach(addCertificateToUI);
// }

// // Function to Add Certificate Card to UI
// function addCertificateToUI(certificate) {
//     // Create a new div element for the certificate card
//     let certificateCard = document.createElement("div");
//     certificateCard.classList.add("certificate-card");
 
//     // Set the inner HTML structure of the certificate card
//     certificateCard.innerHTML = `
//         <h3>${certificate.title}</h3>
//         <p><strong>Issued By:</strong> ${certificate.org}</p>
//         <p><strong>Issued On:</strong> ${certificate.date}</p>
//         <p>${certificate.description}</p>
//         <a href="${certificate.link}" target="_blank" class="view-btn">View Certificate</a>
//         <button class="remove-btn" onclick="requestDelete(this)">Remove</button>
//     `;

//     // Append the newly created card to the certificate list container
//     document.getElementById("certificate-list").appendChild(certificateCard);
// }

// // Function to Request Deletion with a Confirmation Key
// function requestDelete(button) {
//     let key = prompt("Enter the delete key to remove this certificate:");
//     if (key === "Rupali@0511") { // Change this key if needed
        
//         // Get the parent certificate card element
//         let certificateCard = button.parentElement;
//         let title = certificateCard.querySelector("h3").innerText;

//         // Remove from Local Storage
//         let certificates = JSON.parse(localStorage.getItem("certificates")) || [];
//         certificates = certificates.filter(certificate => certificate.title !== title);
//         localStorage.setItem("certificates", JSON.stringify(certificates));

//         // Remove the certificate card from the UI
//         certificateCard.remove();
//     } else {
//         alert("Incorrect key! You cannot delete this certificate.");
//     }
// }

// // Load Certificates from Local Storage when the page loads
// window.onload = loadCertificates;













const BASE_URL = 'http://localhost:5000';

function openForm() {
    document.getElementById("certificate-form").style.display = "flex";
}

function closeForm() {
    document.getElementById("certificate-form").style.display = "none";
}

async function addCertificate() {
    let title = document.getElementById("title").value;
    let date = document.getElementById("date").value;
    let org = document.getElementById("org").value;
    let description = document.getElementById("description").value;
    let link = document.getElementById("link").value;

    if (!title || !date || !org || !description || !link) {
        alert("All fields are required!");
        return;
    }

    const certificate = { title, date, org, description, link };

    try {
        const res = await fetch(`${BASE_URL}/certificates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(certificate)
        });

        const savedCertificate = await res.json();
        addCertificateToUI(savedCertificate);
        closeForm();

        // Clear form fields
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.getElementById("org").value = "";
        document.getElementById("description").value = "";
        document.getElementById("link").value = "";

    } catch (err) {
        console.error("Failed to add certificate:", err);
    }
}

async function loadCertificates() {
    try {
        const res = await fetch(`${BASE_URL}/certificates`);
        const certificates = await res.json();
        certificates.forEach(addCertificateToUI);
    } catch (err) {
        console.error("Error fetching certificates:", err);
    }
}

function addCertificateToUI(certificate) {
    let card = document.createElement("div");
    card.classList.add("certificate-card");
    card.setAttribute("data-id", certificate._id); // for deletion

    card.innerHTML = `
        <h3>${certificate.title}</h3>
        <p><strong>Issued By:</strong> ${certificate.org}</p>
        <p><strong>Issued On:</strong> ${certificate.date}</p>
        <p>${certificate.description}</p>
        <a href="${certificate.link}" target="_blank" class="view-btn">View Certificate</a>
        <button class="remove-btn" onclick="requestDelete(this)">Remove</button>
    `;

    document.getElementById("certificate-list").appendChild(card);
}

async function requestDelete(button) {
    let key = prompt("Enter the delete key to remove this certificate:");
    if (key !== "Rupali@0511") {
        alert("Incorrect key!");
        return;
    }

    const card = button.parentElement;
    const id = card.getAttribute("data-id");

    try {
        await fetch(`${BASE_URL}/certificates/${id}`, { method: 'DELETE' });
        card.remove();
    } catch (err) {
        console.error("Failed to delete certificate:", err);
    }
}

window.onload = loadCertificates;
