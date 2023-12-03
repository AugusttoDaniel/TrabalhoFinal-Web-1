function novoPedido() {
  document.getElementById("demo-modal").classList.add("active");
}
let currentProduct = null;
function cardModal(produto) {
  currentProduct = produto;
  const modal = document.getElementById("demo-modal2");
  modal.querySelector(".modal__title").textContent = produto.Nome;
  modal.querySelector(".modal__description").textContent = produto.Descricao;
  modal.querySelector(".price").textContent = `R$ ${produto.Preco}`;

  modal.classList.add("active");
}

function fecharModal() {
  document.getElementById("demo-modal").classList.remove("active");
}
function fecharModal2() {
  document.getElementById("demo-modal2").classList.remove("active");
}
function toggleMenu() {
  var menu = document.getElementById("menu-itens");
  menu.classList.toggle("menu-ativo");

  if (menu.classList.contains("menu-ativo")) {
    document.addEventListener("click", closeMenuOnClickOutside);
  } else {
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}
function toggleItens(pedidoId) {
  var menu = document.getElementById("menuLateral");
  menu.classList.toggle("menu-ativo");

  if (menu.classList.contains("menu-ativo")) {
    document.addEventListener("click", closeMenuOnClickOutside);
  } else {
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}

function closeMenuOnClickOutside(event) {
  var menu = document.getElementById("menuLateral");

  // Se o clique ocorreu fora do menu, fechamos o menu.
  if (!menu.contains(event.target)) {
    menu.classList.remove("menu-ativo");

    // Removemos o listener depois de usar, para não interferir em outros cliques.
    document.removeEventListener("click", closeMenuOnClickOutside);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  function carregarProdutosCategorias() {
    const categorias = ["Pizza", "Hambúrguer", "Bebidas", "Doces"];
    categorias.forEach((categoria) => {
      fetch(`http://localhost:8080/produto/categoria/${categoria}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            preencherCartoes(categoria, data);
          } else {
            console.error("Expected an array of produtos, got:", data);
          }
        })
        .catch((error) => console.error("Erro ao carregar dados:", error));
    });
  }

  // Função para preencher os cartões com os dados dos produtos
  function preencherCartoes(categoria, produtos) {
    const section = document.getElementById(categoria);
    const row = section ? section.querySelector(".row") : null;

    if (row) {
      produtos.forEach((produto) => {
        // Create a new column for each product
        const column = document.createElement("div");
        column.classList.add("column");

        // Create the card and its elements
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.gap = "10px";
        card.style.marginBottom = "20px";
        const nome = document.createElement("h3");
        nome.textContent = produto.Nome;

        const descricao = document.createElement("p");
        descricao.textContent = produto.Descricao;

        const preco = document.createElement("p");
        preco.textContent = `Preço: R$ ${produto.Preco}`;

        const button = document.createElement("button");
        button.innerHTML = "+";
        button.style.width = "100px";
        button.style.height = "30px";
        button.style.borderRadius = "5px";
        button.addEventListener("click", () => cardModal(produto));

        // Append elements to the card
        card.appendChild(nome);
        card.appendChild(descricao);
        card.appendChild(preco);
        card.appendChild(button);

        // Append the card to the column
        column.appendChild(card);

        // Append the new column to the row
        row.appendChild(column);
      });
    } else {
      console.error(`Section not found for category: ${categoria}`);
    }
  }

  carregarProdutosCategorias();
});

document.addEventListener("DOMContentLoaded", (event) => {
  const decreaseButton = document.querySelector(".decrease");
  const increaseButton = document.querySelector(".increase");
  const quantidadeDisplay = document.querySelector(".quantity");

  decreaseButton.addEventListener("click", () => {
    let quantidade = parseInt(quantidadeDisplay.textContent, 10);
    if (quantidade > 1) {
      quantidadeDisplay.textContent = quantidade - 1;
    }
  });

  increaseButton.addEventListener("click", () => {
    let quantidade = parseInt(quantidadeDisplay.textContent, 10);
    quantidadeDisplay.textContent = quantidade + 1;
  });
});

function toggleCartDisplay() {
  const cartElement = document.getElementById("cart");
  if (cartElement) {
    
    cartElement.classList.toggle("active");
  } else {
    console.error("Elemento do carrinho não encontrado!");
  }
}
//Pedidos Pendente
document.addEventListener("DOMContentLoaded", () => {
  function carregarPedidosPendentes() {
    fetch("http://localhost:8080/pedido/pendentes")
      .then((response) => response.json())
      .then((pedidos) => {
        preencherPedidosPendentes(pedidos);
      })
      .catch((error) =>
        console.error(error.message)
      );
  }

  function preencherPedidosPendentes(pedidos) {
    const secaoPedidos = document.getElementById("Pedidos");
    secaoPedidos.innerHTML = "";
    if (pedidos.length === 0) {
      secaoPedidos.innerHTML = "<p>Não há pedidos pendentes.</p>";
    } else {
      pedidos.forEach((pedido) => {
        const elementoPedido = document.createElement("div");
        elementoPedido.style.margin = "0px 20px 10px 20px";
        elementoPedido.style.padding = "20px";
        elementoPedido.style.border = "1px solid black";
        elementoPedido.style.borderRadius = "5px";
        elementoPedido.style.display = "flex";
        elementoPedido.style.justifyContent = "space-between";
        elementoPedido.style.alignItems = "center";
        elementoPedido.addEventListener("click", () => toggleItens(pedido.id));
        elementoPedido.classList.add("pedido");

        const dataPedido = new Date(pedido.DataPedido);
        const agora = new Date();
        const diferencaTempo = agora - dataPedido; // Diferença em milissegundos
        const diferencaMinutos = Math.floor(diferencaTempo % 3600000);
        // Criando a label para o ID do Pedido
        const labelPedidoId = document.createElement("label");
        labelPedidoId.textContent = `#${pedido.id}`;
        elementoPedido.appendChild(labelPedidoId);

        const nome = document.createElement("label");
        nome.textContent = `${pedido.cliente.Nome}`;
        elementoPedido.appendChild(nome);

        const total = document.createElement("label");
        total.textContent = `${pedido.PrecoTotal}`;
        elementoPedido.appendChild(total);

        // Criando a label para o tempo de demora
        const labelTempoDemora = document.createElement("label");
        labelTempoDemora.textContent = `⏰ ${diferencaMinutos} min`;
        elementoPedido.appendChild(labelTempoDemora);

        // Criando a botão concluído
        const button = document.createElement("button");
        button.style.padding = "5px";
        button.innerHTML = "&#10003; Finalizar";
        button.addEventListener("click", () => concluirPedido(pedido.id));
        elementoPedido.appendChild(button);

        secaoPedidos.appendChild(elementoPedido);
      });
    }
  }
  //Função para concluir o pedido
  function concluirPedido(pedidoId) {
    fetch(`http://localhost:8080/pedido/${pedidoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo esperado
      },
      body: JSON.stringify({ Status: "concluído" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        carregarPedidosPendentes();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o status do pedido:", error);
      });
  }

  carregarPedidosPendentes();
});


let cart = [];
function addToCart(produto) {
  const existingProduct = cart.find((p) => p.id === produto.id);
  if (existingProduct) {
    existingProduct.quantidade += 1; // Increase quantity if product already exists
  } else {
    cart.push({ ...produto, quantidade: 1 }); // Add new product with quantity 1
  }
  updateCartUI(); // Function to refresh the cart UI
}
function removeFromCart(productId) {
  const productIndex = cart.findIndex((p) => p.id === productId);
  if (productIndex > -1) {
    if (cart[productIndex].quantidade > 1) {
      cart[productIndex].quantidade -= 1;
    } else {
      cart.splice(productIndex, 1);
    }
  }
  updateCartUI();
}
function updateCartUI() {
  const cartElement = document.getElementById("cart"); // Assume an element to display cart
  cartElement.innerHTML = ""; // Clear existing cart contents
  cart.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${item.Nome} - Quantidade: ${item.quantidade}`;
    cartElement.appendChild(itemElement);
  });
}
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

document.addEventListener("DOMContentLoaded", loadCart);
