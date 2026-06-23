const fetchBtn = document.getElementById("fetchButton");
const deleteBtn = document.getElementById("deleteButton");
const submitPost = document.getElementById("postForm");
const successPost = document.getElementById("formSuccess");

async function handleSubmit(event) {
    event.preventDefault();
    const elements = event.target.elements;
    const title = elements.title.value;
    const body = elements.body.value;
    const jsonObj = {
        "title": title,
        "body": body
    }
    
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(jsonObj)
        });

        const data = await response.json();
        alert(`Post submitted Successfully!
            ${data.title}
            ${data.body}`);
    } catch(err) {
        console.error(`${err.message}\nUnable to post data`);
    }
}

async function handleClick() {
    // Make the GET request   

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        const div = document.getElementById("postList");
        for (let post of data) {
            const postContainer = document.createElement("div")
            postContainer.innerHTML = 
                `
                <p>Title: ${post.title}</p>
                <p>Message: ${post.body}</p>
                <br>
                `;
            div.appendChild(postContainer);
        }
    } catch(err) {
        console.error(`${err.message}\nUnable to pull data`)
    }
}

async function handleDelete() {

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) alert("Delete successful!");
    } catch(err) {
        console.error(`${err.message}: Data could not be deleted`);
    }
}

submitPost.addEventListener("submit", handleSubmit);
fetchBtn.addEventListener("click", handleClick);
deleteBtn.addEventListener("click", handleDelete);