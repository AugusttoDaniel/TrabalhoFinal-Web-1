function novoPedido() {
  document.getElementById("demo-modal").classList.add("active");
}
function cardModal(produto) {
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
  const quantityDisplay = document.querySelector(".quantity");

  decreaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityDisplay.textContent, 10);
    if (quantity > 1) {
      quantityDisplay.textContent = quantity - 1;
    }
  });

  increaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityDisplay.textContent, 10);
    quantityDisplay.textContent = quantity + 1;
  });
});



document.addEventListener("DOMContentLoaded", () => {
  function carregarPedidosPendentes() {
    fetch('http://localhost:8080/pedido/pendentes')
    .then(response => {
      if (response.headers.get("content-type").includes("application/json")) {
        return response.json();
      } else {
        throw new Error('Não é JSON');
      }
    })
    .then(pedidos => {
      preencherPedidosPendentes(pedidos) 
    })
    .catch(error => console.error("Erro ao carregar pedidos pendentes:", error));
  }
  
  function preencherPedidosPendentes(pedidos) {
    const secaoPedidos = document.getElementById("Pedidos");
    secaoPedidos.innerHTML = ''; 
    pedidos.forEach(pedido => {
      const elementoPedido = document.createElement("div");
      elementoPedido.classList.add("pedido");
      elementoPedido.textContent = `Pedido #${pedido.id}`;
      secaoPedidos.appendChild(elementoPedido);
    });
  }
  carregarPedidosPendentes();
});

