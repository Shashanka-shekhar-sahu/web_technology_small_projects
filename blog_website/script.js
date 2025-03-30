// Function to load posts from localStorage
function loadPosts() {
    const blogPosts = document.getElementById("blogPosts");
    blogPosts.innerHTML = "";

    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        blogPosts.appendChild(postElement);
    });
}

// Function to add a new post
function addPost() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title === "" || content === "") {
        alert("Please fill in all fields.");
        return;
    }

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push({ title, content });

    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    loadPosts();
}

// Function to delete a post
function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

// Load posts on page load
window.onload = loadPosts;
