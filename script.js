const produtos = [
    {
        nome: "Áudio 1",
        categoria: "audio",
        valor: 200.50,
        avaliacao: 4.5
    },{
        nome: "Áudio 2",
        categoria: "audio",
        valor: 100,
        avaliacao: 4.3
    },{
        nome: "Acessório 1",
        categoria: "acessorio",
        valor: 20,
        avaliacao: 3.5
    },{
        nome: "Acessório 2",
        categoria: "acessorio",
        valor: 10.90,
        avaliacao: 3.8
    },{
        nome: "Casa 1",
        categoria: "casa",
        valor: 500,
        avaliacao: 4.7
    },{
        nome: "Casa 2",
        categoria: "casa",
        valor: 2000,
        avaliacao: 4.8
    },{
        nome: "Vestível 1",
        categoria: "vestivel",
        valor: 80,
        avaliacao: 4.5
    },{
        nome: "Vestível 2",
        categoria: "vestivel",
        valor: 150,
        avaliacao: 4.5
    },
];
const gradeProdutos = document.querySelector("#gradeProdutos");
const semResultados = document.querySelector("#semResultados");
const botoesFiltro = document.querySelectorAll(".filter-button");
const campoBusca = document.querySelector("#busca");
const formBusca = document.querySelector("#formBusca");
const botaoTema = document.querySelector("#tema");
const formNewsletter = document.querySelector("#formNewsletter");
const campoEmail = document.querySelector("#email");
const mensagemNewsletter = document.querySelector("#mensagemNewsletter");
const botaoCarrinhoCompras = document.querySelector("#botaoCarrinhoCompras");
const carrinhoDeCompras = document.querySelector("#carrinhoDeCompras");
const listaProdutos = document.querySelector("#listaProdutos");
const carrinhoDeComprasOverlay = document.querySelector("#carrinhoDeComprasOverlay");

function formatarCategoria(categoria) {
    const nomes = {
        audio: "ÁUDIO",
        acessorio: "ACESSÓRIO",
        casa: "CASA",
        vestivel: "VESTÍVEL"
    };
    return nomes[categoria] || categoria.toUpperCase();
}
function renderizarProdutos(lista) {
    gradeProdutos.innerHTML = "";
    if (lista.length === 0) {
        semResultados.classList.add("visible");
        return;
    }
    semResultados.classList.remove("visible");
    lista.forEach((produto) => {
        const novoProduto = document.createElement("article");
        novoProduto.classList.add("card-produto");
        novoProduto.innerHTML = `
            <div class="conteudo-produto">
                <span class="category ${produto.categoria}">${formatarCategoria(produto.categoria)}</span>
                <h3>${produto.nome}</h3>
                <p class="news-card-description">${produto.avaliacao}</p>
                <p class="news-card-description">R$ ${produto.valor}</p>
                <button class="botao-adicionar-produto" onclick="adicionarProdutoCarrinho('${produto.nome}')">Adicionar</button>
            </div>
        `;
        gradeProdutos.appendChild(novoProduto);
    });
}
let categoriaAtual = "todas";
let textoBusca = "";
function aplicarFiltros() {
    const resultado = produtos.filter(produto => {
        const correspondeCategoria =
            categoriaAtual === "todas" ||
            produto.categoria === categoriaAtual;
        const textoCompleto =
            `${produto.nome}`.toLowerCase();
        const correspondeBusca =
            textoCompleto.includes(textoBusca);
        return correspondeCategoria && correspondeBusca;
    });
    renderizarProdutos(resultado);
}
renderizarProdutos(produtos);
botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesFiltro.forEach(item => {
            item.classList.remove("active");
        });
        botao.classList.add("active");
        categoriaAtual = botao.dataset.categoria;
        aplicarFiltros();
    });
});
campoBusca.addEventListener("input", event => {
    textoBusca = event.target.value.toLowerCase().trim();
    aplicarFiltros();
});
formBusca.addEventListener("submit", event => {carrinhoDeCompras.classList.toggle("ativo")
    event.preventDefault();
    document.querySelector("#noticias").scrollIntoView({
        behavior: "smooth"
    });
});
function atualizarIconeTema() {
    const temaAtual = document.documentElement.dataset.theme;
    if (temaAtual === "escuro") {
        botaoTema.textContent = "Tema Claro";
        botaoTema.setAttribute("aria-label", "Ativar tema claro");
    } else {
        botaoTema.textContent = "Tema Escuro";
        botaoTema.setAttribute("aria-label", "Ativar tema escuro");
    }
}
function abrirCarrinhoDeCompras(){

}

function renderizarCarrinhoDeCompras() {
    listaProdutos.innerHTML = "";
    const produtosCarrinho = localStorage.getItem("carrinho");
    produtosCarrinho.forEach(produto => {
        const novoProduto = document.createElement("article");
        novoProduto.classList.add("card-produto");
        novoProduto.innerHTML = `
            <div class="conteudo-produto">
                <h3>${produto.nome}</h3>
                <p class="news-card-description">R$ ${produto.valor}</p>
                <button>-</button>
                ${produto.quantidade}
                <button>+</button>
            </div>
        `;
        gradeProdutos.appendChild(novoProduto);
    });
}
function alterarQuantidade(produtoNome, quantidade){
    const listaAtualizada = localStorage.getItem("carrinho");
    listaAtualizada.filter(produto => {return produto === produtoNome;}).quantidade = quantidade;
    localStorage.setItem("carrinho", listaAtualizada);
    renderizarCarrinhoDeCompras();
}
function adicionarProdutoCarrinho(produtoNome) {
    if(!localStorage.getItem("carrinho")){
        localStorage.setItem("carrinho", {});
    }
    const produto = produtos.filter(produto => {return produto === produtoNome;});
    if(localStorage.getItem("carrinho").filter(produto => {return produto.nome === produtoNome;}))
    {
        console.log("tem");
    }
    else{
        console.log("nao tem");
    }    
    const listaAtualizada = localStorage.getItem("carrinho");
    const produtoAtualizado = {
        quantidade: 1,
        nome: produtoNome,
        preco: produto.preco
    };
    listaAtualizada.appendChild(produtoAtualizado);
    localStorage.setItem("carrinho", listaAtualizada);
    renderizarCarrinhoDeCompras();
}

function ativarClasseAtivo(elemento){
    elemento.classList.toggle("ativo");    
}

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo) {

    document.documentElement.dataset.theme = temaSalvo;
} else {
    const prefereEscuro = window.matchMedia("(prefers-color-scheme: escuro)").matches;
    if (prefereEscuro) {
        document.documentElement.dataset.theme = "escuro";
    } else {
        document.documentElement.dataset.theme = "claro";
    }
}
atualizarIconeTema();
botaoTema.addEventListener("click", () => {
    const temaAtual = document.documentElement.dataset.theme;
    const novoTema = temaAtual === "escuro" ? "claro" : "escuro";
    document.documentElement.dataset.theme = novoTema;
    localStorage.setItem("tema", novoTema);
    atualizarIconeTema();
});

botaoCarrinhoCompras.addEventListener("click", ()=> {
    ativarClasseAtivo(carrinhoDeCompras);
});

carrinhoDeComprasOverlay.addEventListener("click", ()=> {
    if(carrinhoDeCompras.classList.contains("ativo"))
    {
        carrinhoDeCompras.classList.remove("ativo");
    }
});
renderizarCarrinhoDeCompras();