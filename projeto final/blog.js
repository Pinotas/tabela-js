let posts = [];

function criarPost() {
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  const authorName = document.getElementById("authorName").value;

  if (title && content && authorName) {
    const post = {
      title: title,
      content: content,
      author: authorName,
      date: new Date().toLocaleDateString(),
    };

    posts.push(post);
    exibirPosts();
    limparCampos();
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
}

function exibirPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  for (let i = posts.length - 1; i >= 0; i--) {
    const post = posts[i];
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${post.title}</strong> - ${post.date}<br>
      <em>Autor: ${post.author}</em><br>
      ${post.content}
    `;
    postList.appendChild(listItem);
  }
}

function limparCampos() {
  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  document.getElementById("authorName").value = "";
}

function pesquisarPosts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchTerm);
  });

  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  filteredPosts.forEach((post) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <strong>${post.title}</strong> - ${post.date}<br>
            <em>Autor: ${post.author}</em><br>
            ${post.content}
        `;
    postList.appendChild(listItem);
  });
}
