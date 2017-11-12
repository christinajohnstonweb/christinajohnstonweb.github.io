/*********************************************
  // Ajax handling.
  *********************************************/
$(function(){
  $('.grid').imagesLoaded( function() {
    // images have loaded
    $('.grid').masonry({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.grid-item',
      // use element for option
      columnWidth: 180,
      percentPosition: true,
      horizontalOrder: true,
      fitWidth: true,
      isFitWidth: true,
      resize: true,
      gutter: 5
    });

    $(function(){
      $(window).on("resize", function(){
        $(".grid").masonry();  
      });

      $(window).on("load", function(){
        $(".grid").masonry();
      });

      setTimeout(function(){
        $(".grid").masonry();
      }, 1000);
    });
  });
});