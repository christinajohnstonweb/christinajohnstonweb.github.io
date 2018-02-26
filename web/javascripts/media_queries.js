function responsiveTest(){
  // Resize info blocks, based on width.
  $(".section-img").parent().parent().css( "height", parseInt( $(".content-section").width() )/2 );
  $(".section-img").parent().prev().css( "height", parseInt( $(".content-section").width() )/2 );
  
//   $(".section-img").parent().parent().css( "height", $(".section-img").width() );
//   $(".section-img").parent().prev().css( "height", $(".section-img").width() );
  if( window.matchMedia("(max-width: 414px)").matches || window.matchMedia("(device-max-width: 414px)").matches ){
     // Handle video sizes.
//     $("section.video > iframe").css("width", "300px");
//     $("section.video > iframe").css("height", "169px");
  }
  
  if (window.matchMedia("(max-width: 575px)").matches || window.matchMedia("(device-max-width: 575px)").matches) {
    // Handle news cols.
    var test_single_col = setInterval(function(){
      if( $("#single_col_str").length > 0 ) {
        $(".news-container").html( $("#single_col_str").prop("innerHTML") );
        $(".photos-container").html( $("#single_col_str").prop("innerHTML") );
        
        // Set the width of the container for small device screens.
//         $(".main-news").width( Math.round($(".navbar").width() * 0.8) );
//         $(".photos-container").width( Math.round($(".navbar").width() * 0.8) );
//         $(".main-news").width( Math.round($("#carousel").width() * 0.85) );
//         $(".news-article").width("95%");
        
        clearInterval(test_single_col);
      }
    }, 1000);
    
    $(".section-img").parent().addClass("col-12");
    $(".section-img").parent().prev().addClass("col-12");

    $(".section-img").parent().removeClass("col-6");
    $(".section-img").parent().prev().removeClass("col-6");

    // We're wrapping the cols, so get rid of the row height.
    $(".section-img").parent().parent().css( "height", "" );
  }
  
  // footer-newsletter-container
  if( window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(device-max-width: 768px)").matches ) {
    // Centered footer.
    $(".footer-newsletter-container.col-11").removeClass("col-11");
    $(".footer-newsletter-container").addClass("col-12");
    
    // Handle video sizes.
    $("section.video > iframe").css("width", "280px");
    $("section.video > iframe").css("height", "149px");
  }
  
  if (window.matchMedia("(min-width: 769px)").matches || window.matchMedia("(device-min-width: 769px)").matches) {
  /* the viewport is at least 768 pixels wide */
    $(".section-img").parent().removeClass("col-12");
    $(".section-img").parent().prev().removeClass("col-12");

    $(".section-img").parent().addClass("col-6");
    $(".section-img").parent().prev().addClass("col-6");

    $(".section-img").addClass("img-fluid");

    // Handle the footer.
    $(document).find(".footer-break").remove();

    $(".footer-newsletter-container").children().first().addClass("pull-right");
    $(".footer-newsletter-container").addClass("col-md-4");
    $(".footer-newsletter-container").removeClass("col-11");
    
    // Handle video sizes.
    $("section.video > iframe").css("width", "375px");
    $("section.video > iframe").css("height", "211px");
    
    // Centered footer.
    $(".footer-newsletter-container.col-12").removeClass("col-12");
    $(".footer-newsletter-container").addClass("col-11");
    
    // Handle news cols.
//     $(".news-container").html( $("#single_col_str").prop("innerHTML") );
//     $(".photos-container").html( $("#single_col_str").prop("innerHTML") );
   }
  
  /* the viewport is 768 pixels or less wide */
  if ((window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(device-max-width: 768px)").matches) && window.matchMedia("(min-width: 576px)").matches || window.matchMedia("(device-min-width: 576px)").matches) {
  /* the viewport is at least 768 pixels wide */
    $(".section-img").parent().addClass("col-12");
    $(".section-img").parent().prev().addClass("col-12");

    $(".section-img").parent().removeClass("col-6");
    $(".section-img").parent().prev().removeClass("col-6");

    // We're wrapping the cols, so get rid of the row height.
    $(".section-img").parent().parent().css( "height", "" );
    
//     // Make the 'Home' text sections match the window width.
//     var new_width = $(window).width();
//     if(new_width < 768){
//       new_width = parseInt(new_width * 0.8);
//     }
    
//     $(".text-section", ".news-text").height( new_width );

    // Remove Masonry from smaller screens.
//      if ( $(".grid").length ) {
//       // console.log("Destroying Masonry!");
//       $(".grid").masonry("destroy");  
//     }
    
    if( $(".footer-break") ) {
      // Handle the footer, too.
      $(".footer-newsletter-container").before('<div class="w-100 footer-break"></div>');
      $(".footer-newsletter-container").children().first().removeClass("pull-right");
      $(".footer-newsletter-container").removeClass("col-md-4");
      $(".footer-newsletter-container").addClass("col-11");

      // Handle layout of the text section.
      $(".footer-col-no-title").before('<div class="w-100 footer-break"></div>');
    }
    
    // Handle video sizes.
    $("section.video > iframe").css("width", "300px");
    $("section.video > iframe").css("height", "169px");
    $(".video-caption").width( $(".video").width() );
    
    // Handle news cols.
    $(".news-container").html( $("#two_col_str").prop("innerHTML") );
    $(".photos-container").html( $("#two_col_str").prop("innerHTML") );
  }
  
  // If the viewport < 850px, make the footer contact info stacked instead of horizontal.
  if( window.matchMedia("(max-width: 850px)".matches) ){
    // Handle news cols.
    $(".news-container").html( $("#two_col_str").prop("innerHTML") );
    $(".photos-container").html( $("#two_col_str").prop("innerHTML") );
  }
  
  if( window.matchMedia("(min-width: 851px)").matches || window.matchMedia("(device-min-width: 851px)").matches ) {
    // Handle news cols.
    $(".news-container").html( $("#three_col_str").prop("innerHTML") );
    $(".photos-container").html( $("#three_col_str").prop("innerHTML") );
  }
  
  if (window.matchMedia("(min-width: 1201px)").matches || window.matchMedia("(device-min-width: 1201px)").matches) {
  /* the viewport is at most 1200 pixels wide */
  // Handle video sizes.
    
//     $("section.video > iframe").css("width", "400px");
//     $("section.video > iframe").css("height", "225px");
  }

  // If the viewport < 1200px, make the article sections as tall as they are wide.
  if (window.matchMedia("(max-width: 1200px)").matches) {
  /* the viewport is at least 1200 pixels wide */
    
    /* News width on big screens */
    var carousel_width = $("#carousel").width();
    var small_width = Math.round(carousel_width * .30);
    var ar = $("section.video > iframe").css("width") / $("section.video > iframe").css("height");

    $(".main-news").width( carousel_width );
    $("section.video > iframe").css("width", small_width);
    $("section.video > iframe").css("height", small_width / ar);
  }

  if (window.matchMedia("(min-width: 1381px)").matches || window.matchMedia("(device-min-width: 1381px)").matches) {
  /* the viewport is at most 1200 pixels wide */
  // Handle video sizes.
    $("section.video > iframe").css("width", "425px");
    $("section.video > iframe").css("height", "239px");
  }
  
  if (window.matchMedia("(min-width: 1551px)").matches || window.matchMedia("(device-min-width: 1551px)").matches) {
  /* the viewport is at most 1200 pixels wide */
  // Handle video sizes.
    $("section.video > iframe").css("width", "450px");
    $("section.video > iframe").css("height", "253px");
    
    // Handle news cols.
    // $(".news-container").html( $("#three_col_str").prop("innerHTML") );
  }
  
  // >1600px.
  if (window.matchMedia("(min-width: 1660px)").matches || window.matchMedia("(device-min-width: 1660px)").matches) {
    // Handle video sizes.
    $("section.video > iframe").css("width", "475px");
    $("section.video > iframe").css("height", "267px");
    
    // Handle news cols.
    // $(".news-container").html( $("#three_col_str").prop("innerHTML") );
  }
  
  // >1750px.
  if (window.matchMedia("(min-width: 1750px)").matches || window.matchMedia("(device-min-width: 1750px)").matches) {
    // Handle video sizes.
    $("section.video > iframe").css("width", "500px");
    $("section.video > iframe").css("height", "281px");
    
    // Handle news cols.
    // $(".news-container").html( $("#three_col_str").prop("innerHTML") );
  }
}