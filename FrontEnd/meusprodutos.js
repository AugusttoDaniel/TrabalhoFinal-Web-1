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
    const categorias = {
      Pizza: "produtosPizzas",
      Hamburguer: "produtosHamburguer",
      Bebidas: "produtosBebidas",
      Doces: "produtosDoces",
    };

    Object.entries(categorias).forEach(([categoria, divId]) => {
      fetch(`http://localhost:8080/produto/categoria/${categoria}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            preencherCartoes(divId, data);
          } else {
            console.error("Expected an array of produtos, got:", data);
          }
        })
        .catch((error) => console.error("Erro ao carregar dados:", error));
    });
  }
  function preencherCartoes(categoria, produtos) {
    const container = document.querySelector(`.${categoria}`);

    if (container) {
      produtos.forEach((produto) => {
        // Criação do cartão do produto
        const card = document.createElement("div");
        card.className = "produto-card";
        console.log(produto.id)
        const id = document.createElement("input");
        id.value = produto.id;
        id.className = "product-name";
        id.setAttribute("readonly", true); // Se não quiser que seja editável
        // Nome do Produto
        const nome = document.createElement("input");
        nome.value = produto.Nome;
        nome.className = "product-name";
        nome.setAttribute("readonly", true); // Se não quiser que seja editável

        // Descrição do Produto
        const descricao = document.createElement("input");
        descricao.value = produto.Descricao;
        descricao.className = "product-description";
        descricao.setAttribute("readonly", true); // Se não quiser que seja editável

        // Preço do Produto
        const preco = document.createElement("input");
        preco.value = `R$ ${parseFloat(produto.Preco).toFixed(2)}`;
        preco.className = "product-price";
        preco.setAttribute("readonly", true); // Se não quiser que seja editável
        const botaoSalvar = document.createElement("button");
        botaoSalvar.textContent = "Salvar";
        botaoSalvar.style.display = "none"; // Inicialmente oculto
        botaoSalvar.onclick = function () {
          atualizarProduto(
            produto.Id,
            nome.value,
            descricao.value,
            parseFloat(preco.value.replace("R$ ", "")),
            card
          );
          // Desabilita a edição após salvar
          nome.readOnly = true;
          descricao.readOnly = true;
          preco.readOnly = true;
          botaoSalvar.style.display = "none"; // Oculta o botão Salvar após o clique
        };

        // Botão Editar
        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = function () {
          nome.readOnly = false;
          descricao.readOnly = false;
          preco.readOnly = false;
          botaoSalvar.style.display = "inline"; // Mostra o botão Salvar
        };
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = function () {
          // Chama a função para remover o produto
          removerProduto(produto.id, card);
        };
        // Adiciona elementos ao cartão

        card.appendChild(id);
        card.appendChild(nome);
        card.appendChild(descricao);
        card.appendChild(preco);
        card.appendChild(botaoEditar);
        card.appendChild(botaoSalvar);
        card.appendChild(botaoRemover);
        // Adiciona o cartão ao container da categoria
        container.appendChild(card);
      });
    } else {
      console.error(`Container not found for category: ${categoria}`);
    }
  }
  function removerProduto(id, cardElement) {
    // Chama a API para remover o produto pelo id
    fetch(`http://localhost:8080/produto/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Remove o cartão do produto da interface
          cardElement.remove();
        } else {
          console.error("Falha ao remover produto", response);
        }
      })
      .catch((error) => {
        console.error("Erro ao remover produto", error);
      });
  }
  function removerProduto(id, cardElement) {
    // Chama a API para remover o produto pelo id
    fetch(`http://localhost:8080/produto/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Remove o cartão do produto da interface
          cardElement.remove();
        } else {
          console.error("Falha ao remover produto", response);
        }
      })
      .catch((error) => {
        console.error("Erro ao remover produto", error);
      });
  }
  function atualizarProduto(id, nome, descricao, preco, cardElement) {
    const produtoAtualizado = {
      Nome: nome,
      Descricao: descricao,
      Preco: preco,
    };

    fetch(`http://localhost:8080/produto/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoAtualizado),
    })
      .then((response) => {
        if (response.ok) {
          // Atualiza a UI se necessário ou dá feedback de sucesso
          console.log("Produto atualizado com sucesso!");
        } else {
          // Feedback para erro de resposta
          console.error("Falha ao atualizar produto", response);
        }
      })
      .catch((error) => {
        // Feedback para erro de rede
        console.error("Erro ao atualizar produto", error);
      });
  }
  carregarProdutosCategorias();
});
function toggleProducts(button, produtos) {
  button.addEventListener("click", () => {
    if (produtos.style.display === "none" || produtos.style.display === "") {
      produtos.style.display = "block";
    } else {
      produtos.style.display = "none";
    }
  });
}

// Selecionar e configurar os botões e conteúdo dos produtos para cada grupo
const toggleButtonPizzas = document.querySelector("#toggleProductsPizzas");
const produtosPizzas = document.querySelector(".produtosPizzas");
toggleProducts(toggleButtonPizzas, produtosPizzas);

const toggleButtonHamburguer = document.querySelector(
  "#toggleProductsHamburguer"
);
const produtosHamburguer = document.querySelector(".produtosHamburguer");
toggleProducts(toggleButtonHamburguer, produtosHamburguer);

const toggleButtonBebidas = document.querySelector("#toggleProductsBebidas");
const produtosBebidas = document.querySelector(".produtosBebidas");
toggleProducts(toggleButtonBebidas, produtosBebidas);

const toggleButtonDoces = document.querySelector("#toggleProductsDoces");
const produtosDoces = document.querySelector(".produtosDoces");
toggleProducts(toggleButtonDoces, produtosDoces);
