$(function(){
  $(window).resize(function(){
    if (window.matchMedia("(min-width: 1201px)").matches) {
    /* the viewport is at most 1200 pixels wide */
      $(".section-img").parent().parent().css( "height", "" );
    }
    
    if (window.matchMedia("(min-width: 769px)").matches || window.matchMedia("(device-min-width: 769px)").matches) {
    /* the viewport is at most 768 pixels wide */
      $(".section-img").parent().removeClass("col-12");
      $(".section-img").parent().prev().removeClass("col-12");
      
      $(".section-img").parent().addClass("col-6");
      $(".section-img").parent().prev().addClass("col-6");
      
      $(".section-img").addClass("img-fluid");
     }
    
    
    if (window.matchMedia("(max-width: 1200px)").matches) {
    /* the viewport is at least 1200 pixels wide */
      $(".section-img").parent().parent().css( "height", $(".section-img").width() );
    }
    
    if (window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(device-max-width: 768px)").matches) {
    /* the viewport is at least 768 pixels wide */
      $(".section-img").parent().addClass("col-12");
      $(".section-img").parent().prev().addClass("col-12");
      
      $(".section-img").parent().removeClass("col-6");
      $(".section-img").parent().prev().removeClass("col-6");
      
      // We're wrapping the cols, so get rid of the row height.
      $(".section-img").parent().parent().css( "height", "" );
      
      // Remove the 'img-fluid' class.
//       $('[property="about_image"]').toggleClass("img-fluid");
    }
  });
});