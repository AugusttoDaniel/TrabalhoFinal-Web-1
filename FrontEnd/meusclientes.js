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
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8080/cliente");
    if (!response.ok) {
      throw new Error(`Erro ao carregar clientes: ${response.statusText}`);
    }

    const clientes = await response.json();
    clientes.forEach((cliente) => adicionarClienteNaTabela(cliente));
  } catch (error) {
    console.error("Falha ao carregar clientes:", error);
  }
});

document
  .getElementById("clienteForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const cliente = {
      Nome: document.getElementById("nome").value,
      Email: document.getElementById("email").value,
      Endereco: document.getElementById("endereco").value,
      Telefone: document.getElementById("telefone").value,
    };

    try {
      const response = await fetch("http://localhost:8080/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const novoCliente = await response.json();
      adicionarClienteNaTabela(novoCliente);
      limparFormulario();
    } catch (error) {
      console.error("Falha ao salvar o cliente:", error);
    }
  });

function adicionarClienteNaTabela(cliente) {
  const tabela = document
    .getElementById("clientesTable")
    .getElementsByTagName("tbody")[0];
  const novaLinha = tabela.insertRow(tabela.rows.length);

  novaLinha.innerHTML = `
        <td>${cliente.Nome}</td>
        <td>${cliente.Email}</td>
        <td>${cliente.Endereco}</td>
        <td>${cliente.Telefone}</td>
        <td>
            <button onclick="editarCliente(this, ${cliente.id})">Editar</button>
            <button onclick="excluirCliente(this, ${cliente.id})">Excluir</button>
        </td>
    `;
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("telefone").value = "";
}

async function editarCliente(btn, id) {
  // Obter dados do cliente
  const response = await fetch(`http://localhost:8080/cliente/${id}`);
  const cliente = await response.json();

  // Preencher o formulário com os dados do cliente
  document.getElementById("nome").value = cliente.Nome;
  document.getElementById("email").value = cliente.Email;
  document.getElementById("endereco").value = cliente.Endereco;
  document.getElementById("telefone").value = cliente.Telefone;

  // Remover a linha após a edição
  excluirCliente(btn, id);
}

async function excluirCliente(btn, id) {
  const response = await fetch(`http://localhost:8080/cliente/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // Remover a linha da tabela
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  } else {
    console.error("Falha ao excluir o cliente");
  }
}
