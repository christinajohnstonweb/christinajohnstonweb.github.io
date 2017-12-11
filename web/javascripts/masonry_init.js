function refreshMasonry(){
  //$(".grid").masonry("destroy");
          
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

  $(".grid").masonry();
}

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
        setTimeout(function(){
          refreshMasonry();
        }, 1000);
      });

      $(window).on("load", function(){
        setTimeout(function(){
          $(".grid").masonry("destroy");
          
          refreshMasonry();
        }, 1000);
      });

      setTimeout(function(){
        refreshMasonry();
      }, 1000);
    });
  });
});