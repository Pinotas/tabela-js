let posts = [
  // Suponha que haja posts já existentes
];

function searchPosts() {
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm)
  );

  displayPosts(filteredPosts);
  document.getElementById(
    "post-count"
  ).innerText = `${filteredPosts.length} posts encontrados`;
}

function displayPosts(postsToShow) {
  const postFeed = document.getElementById("post-feed");
  postFeed.innerHTML = "";

  postsToShow.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const titleElement = document.createElement("h2");
    titleElement.innerText = post.title;

    const bodyElement = document.createElement("p");
    bodyElement.innerText = post.body;

    const likesElement = document.createElement("div");
    likesElement.classList.add("likes");
    likesElement.innerHTML = `
            <span>${post.likes} likes</span>
            <img src="${post.userProfileImage}" alt="Profile Image">
        `;

    const dateElement = document.createElement("div");
    dateElement.classList.add("date");
    const postDate = new Date(post.date);
    dateElement.innerText = postDate.toLocaleString("pt-BR");

    const commentsSection = document.createElement("div");
    commentsSection.classList.add("comments-section");

    // Lógica para adicionar comentários a commentsSection

    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);
    postElement.appendChild(likesElement);
    postElement.appendChild(dateElement);
    postElement.appendChild(commentsSection);

    postFeed.appendChild(postElement);
  });
}

function submitPost() {
  const newPostContent = document.getElementById("new-post-content").value;
  const newPost = {
    title: "Novo Post", // Título do novo post
    body: newPostContent, // Conteúdo do novo post
    likes: 0, // Número inicial de likes
    // Adicione outras informações necessárias, como a data do post
  };

  posts.push(newPost); // Adiciona o novo post ao array de posts

  displayPosts(posts); // Atualiza a exibição dos posts
}
