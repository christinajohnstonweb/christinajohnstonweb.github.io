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

// Parse querystrings.
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function(){
  // JS media queries.
  $(window).on("resize", function(){
    responsiveTest();
  });
  
  $( window ).on( "load", function() {
    // Resize info blocks, based on width.
    setTimeout(function(){ responsiveTest() }, 300);
    
    // Zoom logo on "About" page in.
    if( $(".about-logo") ) {
      $(".about-logo").animate({
        width: "320px",
        height: "67px"
  //       width: "385px",
  //       height: "81px"
      }, 2000);
    }
    
    $(".spinner").hide();
    $("main").fadeIn("slow");
//     $(".section-img").parent().parent().css( "height", $(".section-img").width() );
    $(".section-img").parent().prev().css( "height", $(".section-img").width() );
  });
  
  // Handle album clicks.
  $(document).on("click", ".discography-more-btn", function(e){
    e.preventDefault();
    e.stopPropagation();
    
    var loc = $(this).attr("href") + "/?name=" + $(this).data("album");
    window.location.href = loc;
  });
  
  // Handle concert clicks.
  $(document).on("click", ".concert-more-btn", function(e){

    e.preventDefault();
    e.stopPropagation();
    
    var loc = $(this).attr("href") + "?name=" + $(this).data("event");
    window.location.href = loc;
  });
  
  /*********************************************
  // Ajax handling.
  *********************************************/
  $.ajax({
      type: "GET",
      url: "https://raw.githubusercontent.com/christinajohnstonweb/christinajohnstonweb.github.io/master/data/homepage.json",
      datatype: "json",
      success: function(data){
        // Transform data from text to JS object.
        data = JSON.parse(data);

        // CONCERT LIST BUILDING.
        if( $("#concerts_table_tmpl").length ) {
          // Concerts layout, since Mavo.io won't support 2 references to the same collection on a page.
          // NOTE: Referenced templates are embedded in includes/concerts.html 

          var tbls = [];
          var cards = [];

          $.each(data.concerts, function(key, val){
            if( val.featuredConcert ){
              var event_name = val.concertName.toLowerCase() + " " + val.concertLocation.toLowerCase();
              event_name = event_name.replace(/\s/gi, '-').replace(/[^\w-]/gi, '');

              var concert_tbl = $("#concerts_table_tmpl").prop("innerHTML");
              var concert_card = $("#concerts_card_tmpl").prop("innerHTML");

              concert_tbl = concert_tbl.replace(RegExp("!!concert_img!!", "g"), val.concertLocImg);
              concert_tbl = concert_tbl.replace(RegExp("!!concert_date!!", "g"), val.concertDatetime);
              concert_tbl = concert_tbl.replace(RegExp("!!concert_name!!", "g"), val.concertName);
              concert_tbl = concert_tbl.replace(RegExp("!!concert_venue!!", "g"), val.concertVenue);
              concert_tbl = concert_tbl.replace(RegExp("!!concert_location!!", "g"), val.concertLocation);
              concert_tbl = concert_tbl.replace(RegExp("!!concert_ticket_url!!", "g"), val.concertTicketsURL);
              concert_tbl = concert_tbl.replace(RegExp("!!concert_more_info!!", "g"), val.discDistributor);
              concert_tbl = concert_tbl.replace(RegExp("!!concert_event!!", "g"), event_name);

              concert_card = concert_card.replace(RegExp("!!concert_img!!", "g"), val.concertLocImg);
              concert_card = concert_card.replace(RegExp("!!concert_date!!", "g"), val.concertDatetime);
              concert_card = concert_card.replace(RegExp("!!concert_name!!", "g"), val.concertName);
              concert_card = concert_card.replace(RegExp("!!concert_venue!!", "g"), val.concertVenue);
              concert_card = concert_card.replace(RegExp("!!concert_location!!", "g"), val.concertLocation);
              concert_card = concert_card.replace(RegExp("!!concert_ticket_url!!", "g"), val.concertTicketsURL);
              concert_card = concert_card.replace(RegExp("!!concert_more_info!!", "g"), val.discDistributor);

              tbls.push(concert_tbl);
              cards.push(concert_card);
            }
          });

          $("#concert_tables_content").html(tbls);
          $("#cards_concert_content").html(cards);
        }
        // END CONCERT LIST BUILDING.
        
        // BUILD CONCERT DETAILS
        if( $("#concert_tmpl").length ) {
          var concert_name = getParameterByName("name");
          
          $.each(data.concerts, function(key, val){
            /* Solo/featured albums. */
            var name = val.concertName.toLowerCase() + " " + val.concertLocation.toLowerCase();
            name = name.replace(/\s/gi, '-').replace(/[^\w-]/gi, '');
           
            if(name === concert_name){
              var code = $("#concert_tmpl").prop("innerHTML");

              code = code.replace(RegExp("!!concert_name!!", "g"), val.concertName);
              code = code.replace(RegExp("!!concert_date_time!!", "g"), val.concertDatetime);
              code = code.replace(RegExp("!!concert_venue!!", "g"), val.concertVenue);
              code = code.replace(RegExp("!!concert_descr!!", "g"), val.concertDetails);
              code = code.replace(RegExp("!!concert_location!!", "g"), val.concertLocation);

              $(".concert-container").html(code);
            }
          });
        }
        // END BUILDING CONCERT DETAILS
        
        // BlueImp gallery building.
//         if( $(".blueimp-images").length ) {
//           var gallery_pics = [];
//           $.each(data.photoGallery, function(idx, gallery){
//             var gallery_name = "#" + gallery.galleryTitle.replace(/\s/gi, '-').replace(/[^\w-]/gi, '').toLowerCase();
//             var pics = {gallery: gallery_name, pics: []};
            
//             $.each(gallery.photo, function(key, val){
// //               console.log( '$(' + gallery_name + ').html(\'<a href="' + val.picture + '"></a>\');' );
//               if( val.coverImage === true ){
//                 pics.pics.push('<a href="' + val.picture + '" class="mx-auto btn-black gallery-btn" data-gallery>MORE</a>');
//               } else {
//                 pics.pics.push('<a href="' + val.picture + '" data-gallery></a>');
//               }
//             });
            
//             gallery_pics.push(pics);          
//           });

//           setTimeout(function(){
//             $.each(gallery_pics, function(key, val){
//               // var curr_val = $(val.gallery).html();
//               $(val.gallery).html( val.pics.join("\n") );
//               // $(val.gallery).html( curr_val + val.pics.join("\n") );
//             });
//           }, 1500);
//         }
        // End BlueImp gallery building.
        
        // Photo gallery building.
        if( $('.photo-gallery').length ) {
//         if( $('[property="photoGallery"]').length ) {
          var pic_items = [];
          var itms = [];
          var counter = 0;

          $.each(data.photoGallery, function(idx, gallery){
            // name.replace(/\s/gi, '-').replace(/[^\w-]/gi, '');
          
            $.each(gallery.photo, function(key, val){
              pic_items.push({src: val.picture});
            });
            
            itms.push(pic_items);

            var gallery_name = "#" + gallery.galleryTitle.replace(/\s/gi, '-').replace(/[^\w-]/gi, '').toLowerCase();
            console.log( '$("' + gallery_name + '").magnificPopup({ items: ' + JSON.stringify(itms[counter]) + ', gallery: { enabled: true }, type: "image" });' );
            console.log(gallery_name);
            setTimeout(function(){
              $( gallery_name ).magnificPopup({
                items: itms[counter],
                gallery: { enabled: true },
                type: "image"
              }); 
              console.log("In the setTimeout");
            }, 1000);

            counter = counter++;
          });
        }
        // END PHOTO GALLERY BUILDING.
        
      },
      error: function(data){
        
      }
    });
  /*********************************************
  // End ajax handling.
  *********************************************/
  
  /*********************************************
  // Instagram handling.
  *********************************************/
  if( $("#instagram").length ){
    //       UID = 293336116
    var feed = new Instafeed({
        get: 'user',
        userId: '1593628250',
        accessToken: '1593628250.1677ed0.02eb61b5a3104a83a39d83495e534ed9',
        resolution: "standard_resolution",
        useHttp: "true",
        limit: 3,
        template: '<div class="mx-auto"><a href="{{image}}"><div class="img-featured-container d-flex flex-wrap"><div class="img-backdrop"></div><img src="{{image}}" class="img-responsive instagram-images"/></div></a></div>',
        target: "instafeed",
        after: function() {
          // disable button if no more results to load
          if (!this.hasNext()) {
            // btnInstafeedLoad.setAttribute('disabled', 'disabled');
          }
        },
      });

    feed.run();
  }
  /*********************************************
  // End Instagram handling.
  *********************************************/
});