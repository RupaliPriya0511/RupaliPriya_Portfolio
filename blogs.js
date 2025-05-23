// async function fetchBlogs() {
//     const res = await fetch('http://localhost:5000/blogs');
//     const blogs = await res.json();
//     const blogList = document.getElementById('blog-list');
//     blogList.innerHTML = '';

//     blogs.forEach(blog => {
//         const blogCard = document.createElement('div');
//         blogCard.className = 'blog-card';
//         blogCard.innerHTML = `
//             <h3>${blog.title}</h3>
//             <p>${new Date(blog.date).toDateString()}</p>
//             <p>${blog.content}</p>
//             ${blog.imagePath ? `<img src="http://localhost:5000/${blog.imagePath}" alt="Blog Image">` : ''}
//         `;
//         blogList.appendChild(blogCard);
//     });
// }

// async function addBlog() {
//     const title = document.getElementById('blog-title').value;
//     const date = document.getElementById('blog-date').value;
//     const content = document.getElementById('blog-content').value;
//     const image = document.getElementById('blog-image').files[0];

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('date', date);
//     formData.append('content', content);
//     if (image) formData.append('image', image);

//     await fetch('http://localhost:5000/blogs', {
//         method: 'POST',
//         body: formData
//     });

//     fetchBlogs(); // Refresh blog list
// }

// window.onload = fetchBlogs;










function openBlogForm() {
    document.getElementById("blog-popup").style.display = "block";
  }
  
  function closeBlogForm() {
    document.getElementById("blog-popup").style.display = "none";
  }
  
  // Function to upload blog data (including image)
  async function submitBlog() {
    const title = document.getElementById("blog-title").value;
    const date = document.getElementById("blog-date").value;
    const content = document.getElementById("blog-content").value;
    const imageInput = document.getElementById("blog-image");
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("content", content);
  
    if (imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    }
  
    try {
      const response = await fetch("http://localhost:5000/blogs", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      alert("Blog saved successfully!");
      closeBlogForm();
    //   location.reload(); // optional

    await fetchAndRenderBlogs(); // ✅ Add this line here
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog.");
    }
  }



  async function fetchAndRenderBlogs() {
    const container = document.getElementById("blog-list");
    container.innerHTML = "";
  
    try {
      const response = await fetch("http://localhost:5000/blogs");
      const blogs = await response.json();
  
      blogs.reverse().forEach(blog => {
        const blogCard = document.createElement("div");
        blogCard.className = "blog-card";
        blogCard.setAttribute("data-id", blog._id);
        console.log("Rendered Blog ID:", blog._id);

  
        blogCard.innerHTML = `
          ${blog.imageUrl ? `<img src="http://localhost:5000${blog.imageUrl}" class="blog-img" alt="blog image">` : ""}
          <div class="blog-info" >
            <h3>${blog.title}</h3>
            <p class="blog-date">${new Date(blog.date).toLocaleDateString()}</p>
            <p class="blog-snippet">${blog.content.substring(0, 200)}${blog.content.length > 200 ? "..." : ""}</p>
            <button class="read-more-btn" onclick="toggleFullContent(this)">Read More</button>
            <p class="blog-full-content" style="display: none;">${blog.content}</p>
            <button class="remove-btn" onclick="requestDeleteBlog(this)">Remove</button>
          </div>
        `;
  
        container.appendChild(blogCard);
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      container.innerHTML = "<p>Failed to load blogs.</p>";
    }
  }
  
  function toggleFullContent(button) {
    const fullContent = button.nextElementSibling;
    const isVisible = fullContent.style.display === "block";
    fullContent.style.display = isVisible ? "none" : "block";
    button.textContent = isVisible ? "Read More" : "Read Less";
  }


async function requestDeleteBlog(button) {
  const deleteKey = prompt("Enter the delete key to remove this blog:");
  if (deleteKey !== "Rupali@0511") {
    alert("Incorrect key!");
    return;
  }

  const blogCard = button.closest(".blog-card");
  const blogId = blogCard.getAttribute("data-id");
  console.log("Deleting blog with ID:", blogId);

  try {
    const response = await fetch(`http://localhost:5000/blogs/${blogId}`, {
      method: "DELETE"
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");
    
    if (response.ok) {
      blogCard.remove();
      alert("Blog deleted successfully.");
    } else if (isJson) {
      const error = await response.json();
      alert("Failed to delete blog: " + (error.error || "Unknown error"));
    } else {
      const text = await response.text();
      console.error("Unexpected response:", text);
      alert("Failed to delete blog. Server returned unexpected content.");
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    alert("An unexpected error occurred: " + error.message);
  }
}






  
  // Call this on page load
  document.addEventListener("DOMContentLoaded", fetchAndRenderBlogs);
  
  