let pedidoAtual = null;

let clienteSelecionadoId = null;

let currentProduct = null;
function modalnovoPedido() {
  document.getElementById("demo-modal").classList.add("active");
  fecharMebuItem();
}

function abrirModalCliente() {
  document.getElementById("modal-selecao-cliente").classList.add("active");

  fetch("http://localhost:8080/cliente", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((clientes) => {
      const tabelaClientes = document.getElementById("tabela-clientes");
      tabelaClientes.innerHTML = ""; // Limpa o conteúdo da tabela

      // Cria o cabeçalho da tabela
      const cabecalho = tabelaClientes.createTHead();
      const linhaCabecalho = cabecalho.insertRow();
      const colunaNome = linhaCabecalho.insertCell();
      const colunaEmail = linhaCabecalho.insertCell();
      colunaNome.textContent = "Nome";
      colunaEmail.textContent = "Email";

      // Adiciona os clientes à tabela
      clientes.forEach((cliente) => {
        const linha = tabelaClientes.insertRow();
        const celulaNome = linha.insertCell();
        const celulaEmail = linha.insertCell();
        celulaNome.textContent = cliente.Nome;
        celulaEmail.textContent = cliente.Email;

        // Adicione um evento de clique à linha do cliente
        linha.addEventListener("click", () => {
          // Define o ID do cliente selecionado
          clienteSelecionadoId = cliente.id;
          // Destaca a linha selecionada (opcional)
          linha.classList.add("selecionado");
          // Feche o modal de seleção de cliente
        });
      });
    })
    .catch((error) => {
      console.error("Erro ao obter clientes:", error);
    });
}

function fecharModalCliente() {
  document.getElementById("modal-selecao-cliente").classList.remove("active");
}
function confirmarSelecaoCliente() {
  if (clienteSelecionadoId !== null) {

    const pedido = {
      ClienteID: clienteSelecionadoId,
      PrecoTotal: 0, //
      Status: "pendente",
      DataPedido: new Date().toISOString(),
    };

    // Faça a solicitação POST para adicionar o pedido
    fetch("http://localhost:8080/pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedido),
    })
      .then((response) => response.json())
      .then((novoPedido) => {

        pedidoAtual = novoPedido.id;

        clienteSelecionadoId = null;

        // Fecha o modal de seleção de cliente
        fecharModalCliente();
        modalnovoPedido();
      })
      .catch((error) => {
        console.error("Erro ao adicionar pedido:", error);
      });
  } else {
    // Nenhum cliente selecionado, exiba uma mensagem de erro ou realize outra ação apropriada
    console.error("Nenhum cliente selecionado.");
  }
}

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
  pedidoAtual = null;
  carregarPedidosPendentes();
}
function fecharModal2() {
  document.getElementById("demo-modal2").classList.remove("active");
}
function fecharMebuItem() {
  document.getElementById("menu-itens").classList.remove("menu-itens-ativo");
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

  if (!menu.contains(event.target)) {
    menu.classList.remove("menu-ativo");

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
let carregarPedidosPendentes; // Declara a função globalmente

//Pedidos Pendente
document.addEventListener("DOMContentLoaded", () => {
  carregarPedidosPendentes = function () {
    fetch("http://localhost:8080/pedido/pendentes")
      .then((response) => response.json())
      .then((pedidos) => {
        if (!Array.isArray(pedidos) || pedidos.length === 0) {
          preencherPedidosPendentes(pedidos);
        }
        preencherPedidosPendentes(pedidos);
      })
      .catch((error) => {
        const secaoPedidos = document.getElementById("Pedidos");
        const elementoPedido = document.createElement("div");
        const labelPedidoId = document.createElement("label");
        labelPedidoId.textContent = "Nenhum Pedido Encontrado";
        labelPedidoId.style.margin = "0px 20px 10px 20px";
        secaoPedidos.appendChild(labelPedidoId);
        secaoPedidos.appendChild(elementoPedido);
      });
  };

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
        elementoPedido.addEventListener("click", () => toggleItens(pedido));
        elementoPedido.classList.add("pedido");

        const dataPedido = new Date(pedido.DataPedido);
        const agora = new Date();
        const diferencaTempo = agora - dataPedido; // Diferença em milissegundos
        const diferencaMinutos = Math.floor(diferencaTempo / 60000); // Converte para minutos

        // Criando a label para o ID do Pedido
        const labelPedidoId = document.createElement("label");
        labelPedidoId.textContent = `#${pedido.id}`;
        elementoPedido.appendChild(labelPedidoId);

        const nome = document.createElement("label");
        nome.textContent = `${pedido.cliente.Nome}`;
        elementoPedido.appendChild(nome);

        const total = document.createElement("label");
        //converter preço total para R$valor,00
        let valor = "R$" + pedido.PrecoTotal + ",00";
        total.textContent = valor;
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
        fecharMebuItem();
        carregarPedidosPendentes();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o status do pedido:", error);
      });
  }
  function deletarPedidos(pedidoId) {
    fetch(`http://localhost:8080/pedido/${pedidoId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: status ${response.status}`);
        }
        // Return a resolved promise here to keep the promise chain going
        return Promise.resolve();
      })
      .then(() => {
        carregarPedidosPendentes();
        fecharMebuItem();
      })
      .catch((error) => {
        console.error("Erro ao atualizar o status do pedido:", error);
      });
  }

  function toggleItens(pedido) {
    var menu = document.getElementById("menu-itens");
    menu.classList.toggle("menu-itens-ativo");
    if (menu.classList.contains("menu-itens-ativo")) {
      document.addEventListener("click", closeMenuOnClickOutside);
    } else {
      document.removeEventListener("click", closeMenuOnClickOutside);
    }
    const itens = document.getElementById("menu-itens");
    if (pedido && pedido.itensPedido) {
      itens.innerHTML = "";
      pedido.itensPedido.forEach((item) => {
        // Criando a 'div' para o item
        const elementoItem = document.createElement("div");
        elementoItem.className = "pedido";
        Object.assign(elementoItem.style, {
          margin: "0px 5px 5px 5px",
          padding: "20px",
          border: "1px solid black",
          borderRadius: "9px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        });

        // Função para criar um 'label' com texto
        function criarLabel(texto) {
          const label = document.createElement("label");
          label.textContent = texto;
          label.style.fontFamily = "sans-serif";
          label.style.fontSize = "8px";
          return label;
        }

        // Adicionando o nome do produto
        const nomeProduto = item.produto.Nome
          ? item.produto.Nome
          : "Nome indisponível";
        elementoItem.appendChild(criarLabel(nomeProduto));

        // Adicionando a quantidade
        const quantidade = item.Quantidade ? item.Quantidade.toString() : "0";
        elementoItem.appendChild(criarLabel(`Quantidade: ${quantidade}`));

        // Adicionando o preço unitário
        const preco = item.PrecoUnitario
          ? `R$ ${parseFloat(item.PrecoUnitario).toFixed(2)}`
          : "Preço indisponível";
        elementoItem.appendChild(criarLabel(preco));

        // Adicionando a 'div' do item ao contêiner principal
        itens.appendChild(elementoItem);
      });
      const cancelar = document.createElement("button");
      cancelar.style.padding = "5px";
      cancelar.innerHTML = "&#10005; Cancelar";
      cancelar.addEventListener("click", () => deletarPedidos(pedido.id));
      itens.appendChild(cancelar);

      const finalizar = document.createElement("button");
      finalizar.style.padding = "5px";
      finalizar.innerHTML = "&#10003; Finalizar";
      finalizar.addEventListener("click", () => concluirPedido(pedido.id));
      itens.appendChild(finalizar);

      const adcionar = document.createElement("button");
      adcionar.innerHTML = " Adicionar";
      adcionar.style.padding = "5px";
      pedidoAtual = pedido.id;
      adcionar.addEventListener("click", () => modalnovoPedido());
      itens.appendChild(adcionar);
    }
  }

  carregarPedidosPendentes();
});

//Card
function addToCart(produto) {

  const quantidade = parseInt(document.getElementById("quantity").textContent);
  const produto1 = {
    id: produto.id,
    Nome: produto.Nome,
    Preco: produto.Preco,
    quantidade: quantidade,
  };

  // Verifica se o produto já está no carrinho
  fetch(`http://localhost:8080/itempedido/${pedidoAtual}`)
    .then((response) => response.json())
    .then((itens) => {
      if (!Array.isArray(itens) || itens.length === 0) {
        adicionarItemPedido(produto1);
        carregarPedidosPendentes();
      }

      const itemPedido = itens.find((item) => item.ProdutoID === produto.id);

      if (itemPedido) {
        const novaQuantidade =
          parseInt(itemPedido.Quantidade) + parseInt(quantidade);
        atualizarQuantidadeItemPedido(itemPedido.id, novaQuantidade);
        atualizarPrecoTotalPedido(produto1);
        carregarPedidosPendentes();
      } else {
        adicionarItemPedido(produto1);
        carregarPedidosPendentes();
      }
    })
    .catch((error) => {
      console.error("Erro ao obter itens de pedido:", error);
    });
  // Função para atualizar a quantidade de um item de pedido
}
function atualizarQuantidadeItemPedido(itemPedidoId, novaQuantidade) {
  const requestBody = { Quantidade: novaQuantidade };
  fetch(`http://localhost:8080/itempedido/${itemPedidoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro HTTP: status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      fecharModal2();
    })
    .catch((error) => {
      console.error("Erro ao atualizar a quantidade:", error);
    });
}
function adicionarItemPedido(produto) {
  const itemPedido = {
    PedidoID: pedidoAtual,
    ProdutoID: produto.id,
    Quantidade: produto.quantidade,
    PrecoUnitario: produto.Preco,
  };
  fetch("http://localhost:8080/itempedido/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemPedido),
  })
    .then((response) => response.json())
    .then((novoItemPedido) => {
      itemPedidoAtual = novoItemPedido.id;

      // Atualiza o preço total do pedido
      atualizarPrecoTotalPedido(produto);
    })
    .catch((error) => {
      console.error("Erro ao adicionar item de pedido:", error);
    });
}

function atualizarPrecoTotalPedido(produto) {
  fetch(`http://localhost:8080/pedido/${pedidoAtual}`)
    .then((response) => response.json())
    .then((pedido) => {
      const precoTotal = parseFloat(pedido.PrecoTotal);
      const precoProduto = parseFloat(produto.Preco * produto.quantidade);
      const novoPrecoTotal = precoTotal + precoProduto;

      const requestBody = { PrecoTotal: novoPrecoTotal };
      fetch(`http://localhost:8080/pedido/${pedidoAtual}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro HTTP: status ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          fecharModal2();
        })
        .catch((error) => {
          console.error("Erro ao atualizar o preço total do pedido:", error);
        });
    })
    .catch((error) => {
      console.error("Erro ao obter pedido:", error);
    });
}
