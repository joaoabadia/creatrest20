function salvarReceitaLocalStorage() {
  var nome = document.getElementById("nomeReceita").innerHTML;
  var imagem = document.getElementById("imgReceita").src;

  var receita = {
    nome: nome,
    imagem: imagem,
  };
  var receitas = JSON.parse(localStorage.getItem("receitas"));
  if (receitas == null) {
    receitas = [];
  }
  receitas.push(receita);
  localStorage.setItem("receitas", JSON.stringify(receitas));
}

function obterReceitasLocalStorage() {
  var receitas = JSON.parse(localStorage.getItem("receitas"));
  if (receitas == null) {
    receitas = [];
  }
  return receitas;
}

function getItemLocalStorage() {
  let array = obterReceitasLocalStorage();

  const divReceitas = document.getElementsByClassName("receita");
  array.forEach((item) => {
    const itemHtml = `
        <div class="d-flex justify-content-between">      
            <div><img src="${item.imagem}"></div> 
            <div>
                <h3>${item.nome}</h3> 
            </div>
        </div>`;
        divReceitas.innerHTML += itemHtml;
    });
}
