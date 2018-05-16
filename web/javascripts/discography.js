$(function(){
  setTimeout(function(){
    // Iterate the albums present on the page, and show the first 6.
  $('.album.hiddenItem').each(function(key, val){
    var that = this;
//   $('[property="album"].hiddenItem').each(function(key, val){
    // If less than 5 because foreach starts with 0 (i.e. 0 to 5, not 1 to 6).
//     debugger;

    if(key < 6) {
      $(that).removeClass("hiddenItem");
      console.log(key);
    }
  });
  }, 10000);
});