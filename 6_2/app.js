// Seleciona o nó da área de comentários usando o seletor CSS
const commentAreaNode = document.querySelector("#comment-area");
const feedbackNode = document.querySelector("#feedback");
// Seleciona o nó do formulário de comentários usando o atributo "name" do formulário
const commentFormNode = document.forms["comment-form"];
// Adiciona um ouvinte de evento para o evento de envio do formulário
commentFormNode.addEventListener("submit", (event) => {
  // Impede o comportamento padrão do formulário de recarregar a página
  event.preventDefault();
  // Obtém os valores do autor e do corpo do comentário do formulário
  const author = commentFormNode.elements["author"].value;
  const body = commentFormNode.elements["comment-Text"].value;
  if (author === "") {
    feedbackNode.textContent =
      "Autor tem que estar preenchido para remeter formulario";
    return;
  }
  if (body.length < 10) {
    feedbackNode.textContent = "O corpo tem que ter mais de 10 caracteres";
    return;
  }
  // Cria um novo nó div para representar o comentário
  const commentNode = document.createElement("div");
  // Adiciona a classe "commentClass" ao nó do comentário
  commentNode.classList.add("commentClass");
  // Cria um novo nó strong para o autor e um novo nó p para o corpo do comentário
  const authorNode = document.createElement("strong");
  const bodyNode = document.createElement("p");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Apagar comentario";
  deleteButton.addEventListener("click", () => {
    commentAreaNode.removeChild(commentNode);
  });
  // Define o texto do nó do autor como o valor do autor obtido do formulário
  authorNode.textContent = author;
  // Define o texto do nó do corpo como o valor do corpo do comentário obtido do formulário
  bodyNode.textContent = body;
  // Adiciona o nó do autor e o nó do corpo ao nó do comentário
  commentNode.appendChild(authorNode);
  commentNode.appendChild(bodyNode);
  commentNode.appendChild(deleteButton);
  // Adiciona o nó do comentário à área de comentários
  commentAreaNode.appendChild(commentNode);
  // Limpa os campos do formulário
  commentFormNode.reset();
  feedbackNode.textContent = "";
});
