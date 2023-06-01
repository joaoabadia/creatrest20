var $filterCheckboxes = $('input[type="checkbox"]');
var filterFunc = function() {

  var selectedFilters = [];

  $filterCheckboxes.filter(':checked').each(function() {
    var v = this.value;
    if (selectedFilters.indexOf(v) === -1) 
        selectedFilters.push(v);
  });
  
  $('.receitas')
    .hide()
    .filter( 
       function(_,a) {
          var itemCat = $(a).data('category').split(' ');
          return selectedFilters.every( 
            function(c){
               return itemCat.indexOf(c) > -1;
            })
    })
    .show();

}

$filterCheckboxes.on('change', filterFunc);