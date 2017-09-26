function responsiveTest(){
  // Resize info blocks, based on width.
  $(".section-img").parent().parent().css( "height", $(".section-img").width() );
  $(".section-img").parent().prev().css( "height", $(".section-img").width() );

  if (window.matchMedia("(min-width: 1201px)").matches) {
  /* the viewport is at most 1200 pixels wide */

  }

  if (window.matchMedia("(min-width: 769px)").matches || window.matchMedia("(device-min-width: 769px)").matches) {
  /* the viewport is at most 768 pixels wide */
    $(".section-img").parent().removeClass("col-12");
    $(".section-img").parent().prev().removeClass("col-12");

    $(".section-img").parent().addClass("col-6");
    $(".section-img").parent().prev().addClass("col-6");

    $(".section-img").addClass("img-fluid");

    // Handle the footer.
    $(document).find(".footer-break").remove();

    $(".footer-newsletter-container").children().first().addClass("pull-right");
    $(".footer-newsletter-container").addClass("col-md-3");
    $(".footer-newsletter-container").removeClass("col-11");
   }


  // If the viewport < 1200px, make the article sections as tall as they are wide.
  if (window.matchMedia("(max-width: 1200px)").matches) {
  /* the viewport is at least 1200 pixels wide */     
  }


  // If the viewport < 850px, make the footer contact info stacked instead of horizontal.
  if( window.matchMedia("(max-width: 850px)".matches) ){
//     console.log("Smaller than 850px.");
  }


  if (window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(device-max-width: 768px)").matches) {
  /* the viewport is at least 768 pixels wide */
    $(".section-img").parent().addClass("col-12");
    $(".section-img").parent().prev().addClass("col-12");

    $(".section-img").parent().removeClass("col-6");
    $(".section-img").parent().prev().removeClass("col-6");

    // We're wrapping the cols, so get rid of the row height.
    $(".section-img").parent().parent().css( "height", "" );

    if( $(".footer-break") ) {
      // Handle the footer, too.
      $(".footer-newsletter-container").before('<div class="w-100 footer-break"></div>');
      $(".footer-newsletter-container").children().first().removeClass("pull-right");
      $(".footer-newsletter-container").removeClass("col-md-3");
      $(".footer-newsletter-container").addClass("col-11");

      // Handle layout of the text section.
      $(".footer-col-no-title").before('<div class="w-100 footer-break"></div>');
    }
  }
}

$(function(){
  // JS media queries.
  $(window).on("resize", function(){
    responsiveTest();
  });
  
  $( window ).on( "load", function() {
    // Resize info blocks, based on width.
    setTimeout(function(){ responsiveTest() }, 300);
    
    $(".spinner").hide();
    $("main").fadeIn("slow");
//     $(".section-img").parent().parent().css( "height", $(".section-img").width() );
    $(".section-img").parent().prev().css( "height", $(".section-img").width() );
  });
});