$(function(){
  // Iterate the albums present on the page, and show the first 6.
  $('[property="album"].hiddenItem').each(function(key, val){
    // If less than 5 because foreach starts with 0 (i.e. 0 to 5, not 1 to 6).
//     debugger;
    if(key < 2) {
      $(this).removeClass("hiddenItem");
    }
  });
});