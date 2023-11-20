const orders = [
  { id: "A658", status: "draft", products: ["T-Shirt", "Polo"] },
  { id: "A446", status: "processing", products: ["T-Shirt"] },
  { id: "A883", status: "draft", products: ["Polo", "Polo"] },
  { id: "A234", status: "processing", products: ["Camisa", "Saia"] },
  { id: "A754", status: "cancelled", products: ["Saia"] },
  { id: "A236", status: "shipped", products: ["Sweatshirt", "Vestido"] },
  { id: "A467", status: "processing", products: ["Camisa", "Saia"] },
  { id: "A213", status: "cancelled", products: ["Vestido", "Top"] },
  { id: "A783", status: "processing", products: ["T-Shirt", "Polo"] },
  { id: "A364", status: "shipped", products: ["T-Shirt", "Polo"] },
];
// Seleciona o nó do corpo da tabela pelo ID "table-body"
const tableBodyNode = document.querySelector("#table-body");
// Itera sobre cada objeto na array de pedidos (orders)
for (let order of orders) {
  // Cria um elemento <tr> para representar uma linha na tabela
  const trorder = document.createElement("tr");
  // Cria elementos <td> para cada coluna na linha da tabela
  const tdId = document.createElement("td");
  const tdEstado = document.createElement("td");
  const tdProduto = document.createElement("td");
  // Adiciona o conteúdo do ID do pedido à coluna correspondente
  tdId.textContent = order.id;
  // Adiciona o conteúdo do estado do pedido à coluna correspondente
  tdEstado.textContent = order.status;
  // Adiciona o conteúdo dos produtos à coluna correspondente, separados por vírgula
  tdProduto.textContent = order.products.join(", ");
  // Adiciona as colunas à linha da tabela
  trorder.appendChild(tdId);
  trorder.appendChild(tdEstado);
  trorder.appendChild(tdProduto);
  // Adiciona a linha completa à tabela
  tableBodyNode.appendChild(trorder);
}
