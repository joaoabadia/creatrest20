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

  const divReceitas = document.getElementById("receitaDisplay");
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

var filterCheckboxes = $('input[type="checkbox"]');
var filterFunc = function () {
  var selectedFilters = [];
  filterCheckboxes.filter(":checked").each(function () {
    var v = this.value;
    if (selectedFilters.indexOf(v) === -1) selectedFilters.push(v);
  });

  $(".receitas")
    .hide()
    .filter(function (_, a) {
      var itemCat = $(a).data("category").split(" ");
      return selectedFilters.every(function (c) {
        return itemCat.indexOf(c) > -1;
      });
    })
    .show();
};
filterCheckboxes.on("change", filterFunc);
filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it) and remove the oldest active class
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
