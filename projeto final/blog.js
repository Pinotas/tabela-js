// Função para carregar os dados dos arquivos JSON
function carregarDados() {
  // Carregar posts.json
  fetch("posts.json")
    .then((response) => response.json())
    .then((postsData) => {
      // Carregar users.json
      fetch("users.json")
        .then((response) => response.json())
        .then((usersData) => {
          // Exibir detalhes dos posts
          displayPostsDetails(postsData, usersData);
        })
        .catch((error) => console.error("Erro ao carregar users.json:", error));
    })
    .catch((error) => console.error("Erro ao carregar posts.json:", error));
}

// Função para encontrar o nome do usuário pelo ID
function findUserNameById(userId, usersData) {
  const user = usersData.find((user) => user.id === userId);
  return user ? user.name : "Usuário não encontrado";
}

// Função para encontrar a foto de perfil do usuário pelo ID
function findUserProfilePicById(userId, usersData) {
  const user = usersData.find((user) => user.id === userId);
  return user ? user.picture : "default.jpg"; // Coloque o link para uma imagem padrão caso não haja foto de perfil
}

// Função para exibir os detalhes dos posts
function displayPostsDetails(postsData, usersData) {
  const postList = document.getElementById("postList");

  // Inverte a ordem dos posts (do mais recente para o mais antigo)
  postsData.reverse();

  postsData.forEach((post) => {
    const formattedDate = new Date(post.createdAt).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const postElement = document.createElement("li"); // Cria um elemento li para cada post
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h3>${post.title}</h3> <!-- Título do post -->

      <p><strong>Data de criação:</strong> ${formattedDate}</p>
      <p>${post.body}</p> <!-- Conteúdo do post -->
      <p><strong>Likes:</strong> ${post.likes.length}</p>
      <p><strong>Número de comentários:</strong> ${post.comments.length}</p>
      <p><strong>Comentários:</strong></p>
      <ul style="list-style: none; padding-left: 0;">
        ${post.comments
          .map(
            (comment) => `
              <li style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${findUserProfilePicById(
                  comment.userId,
                  usersData
                )}" alt="Foto de perfil" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
                <span>${findUserNameById(comment.userId, usersData)}: ${
              comment.body
            }</span>
              </li>`
          )
          .join("")}
      </ul>
      <hr>
    `;

    // Adiciona o novo post no início da lista
    postList.insertBefore(postElement, postList.firstChild);
  });
}

// Função para criar a barra de pesquisa de posts
function criarBarraPesquisa() {
  const searchBar = document.createElement("div");
  searchBar.classList.add("search-bar");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "search-input");
  input.setAttribute("placeholder", "Pesquisar por título");

  const button = document.createElement("button");
  button.textContent = "Pesquisar";
  button.addEventListener("click", searchPosts);

  searchBar.appendChild(input);
  searchBar.appendChild(button);
  searchBar.appendChild(postCount);

  document.body.appendChild(searchBar);
}

// Função para pesquisar posts
function searchPosts() {
  const input = document.getElementById("search-input");
  const searchText = input.value.trim().toLowerCase();

  fetch("posts.json")
    .then((response) => response.json())
    .then((postsData) => {
      const filteredPosts = postsData.filter((post) =>
        post.title.toLowerCase().includes(searchText)
      );

      // Atualiza a contagem de posts encontrados
      const postCount = document.getElementById("post-count");
      postCount.textContent = `${filteredPosts.length} posts encontrados`;

      // Limpa a lista de posts antes de exibir os resultados da pesquisa
      const postList = document.getElementById("postList");
      postList.innerHTML = "";

      filteredPosts.forEach((post) => {
        const formattedDate = new Date(post.createdAt).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const postElement = document.createElement("li");
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p><strong>Autor:</strong> ${findUserNameById(
            post.userId,
            usersData
          )}</p>
          <p><strong>Data de criação:</strong> ${formattedDate}</p>
          <p><strong>Likes:</strong> ${post.likes.length}</p>
          <p><strong>Número de comentários:</strong> ${post.comments.length}</p>
          <hr>
        `;
        postList.appendChild(postElement);
      });

      if (filteredPosts.length === 0) {
        const noResultsElement = document.createElement("li");
        noResultsElement.textContent = "Nenhum resultado encontrado.";
        postList.appendChild(noResultsElement);
      }
    })
    .catch((error) => console.error("Erro ao carregar posts.json:", error));
}

function criarPost() {
  const postTitle = document.getElementById("postTitle").value;
  const postContent = document.getElementById("postContent").value;
  const authorName = document.getElementById("authorName").value;

  const newPost = {
    title: postTitle,
    body: postContent,
    userId: 101, // ID do novo usuário
    createdAt: new Date().toISOString(),
    likes: [],
    comments: [],
  };

  // Exibir o novo post localmente
  displayNewPost(newPost, authorName);
}

// Função para exibir o novo post localmente
function displayNewPost(post, authorName) {
  const postList = document.getElementById("postList");
  // Código para exibir o novo post (similar ao anterior)

  const formattedDate = new Date(post.createdAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const postElement = document.createElement("li");
  postElement.classList.add("post");
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p><strong>Autor:</strong> ${authorName}</p>
    <p><strong>Data de criação:</strong> ${formattedDate}</p>
    <p>${post.body}</p>
    <p><strong>Likes:</strong> ${post.likes.length}</p>
    <p><strong>Número de comentários:</strong> ${post.comments.length}</p>
    <hr>
  `;
  postList.appendChild(postElement);
}

document.addEventListener("DOMContentLoaded", () => {
  carregarDados();
  criarBarraPesquisa();
  setupCriarPost(); // Configurar o evento para criar um novo post
});

// Função para configurar o evento de criar um novo post
function setupCriarPost() {
  const criarPostButton = document.querySelector("#postDetails button");
  criarPostButton.addEventListener("click", criarPost);
}
