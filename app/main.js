let livros = [];
const endPointApi = "https://guilhermeonrails.github.io/casadocodigo/livros.json";
const elementoParaInserirLivros = document.getElementById('livros');
const valorTotal = document.getElementById('valor_total_livros_disponiveis');
getLivrosApi();

async function getLivrosApi(){
    const res = await fetch(endPointApi);
    livros = await res.json();
    console.log(livros);
    exibirOsLivrosNaTela(livros);
}


function exibirOsLivrosNaTela(listaDeLivros){
    valorTotal.innerHTML = '';
    const desconto = listaDeLivros.map(preco => (preco.preco - (preco.preco * 0.15)).toFixed(2));
    elementoParaInserirLivros.innerHTML = "";
    listaDeLivros.forEach((element, index) => {
        let verifica = element.quantidade > 0 ? "livros_imagens" : "livros_imagens indisponivel";
        elementoParaInserirLivros.innerHTML += `<div class="livro">
        <img class="${verifica}" src="../imagens/Ouniversodaprogramacao_ebook_large.webp" alt="${element.alt}" />
        <h2 class="livro__titulo">
            ${element.titulo}
        </h2>
        <p class="livro__descricao">${element.autor}</p>
        <p class="livro__preco" id="preco">DE: R$${element.preco}</p>
        <p class="livro__preco" id="preco">POR : R$${desconto[index]}</p>
        <div class="tags">
          <span class="tag">${element.categoria}</span>
        </div>`
    });
}

const btns = document.querySelectorAll('.btn');
btns.forEach(btn => btn.addEventListener('click', function(){
    filtrarLivros(btn.value);
}));


function filtrarLivros(tipo){
    let livrosFiltrados = tipo == "disponivel" ? livros.filter(livro=> livro.quantidade > 0) : livros.filter(livro => livro.categoria == tipo);
    exibirOsLivrosNaTela(livrosFiltrados);
    if(tipo == 'disponivel'){
        const total = calcular(livrosFiltrados);
        exibirValorTotal(total);
    }

}
const btnOrdena = document.querySelector('.btn-ordenacao').addEventListener('click', function(){
    ordenaPrecos(livros);
});
function ordenaPrecos(livros){
    let livrosOrdenados =  livros.sort(function(a,b){
        return a.preco - b.preco;
    });
    console.log(livrosOrdenados);
    exibirOsLivrosNaTela(livrosOrdenados);
}
function calcular(livros){
    return livros.reduce((acc, livros) => acc + livros.preco, 0).toFixed(2);
}
function exibirValorTotal(total){
    valorTotal.innerHTML =`
    <div class="livros__disponiveis">
      <p>Todos os livros disponíveis por R$ <span id="valor">${total}</span></p>
    </div>
    `;
}

