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
    setTimeout(function(){
      responsiveTest();
    }, 1500);

    
    setTimeout(function(){
      $(".spinner").hide();
      $("main").fadeIn("slow");
    }, 1500);
    
    // Zoom logo on "About" page in.
    if( $(".about-logo") ) {
      $(".about-logo").animate({
        width: "320px",
        height: "67px"
  //       width: "385px",
  //       height: "81px"
      }, 2000);
    }
    
//     $(".spinner").hide();
//     $("main").fadeIn("slow");
    
//     $(".section-img").parent().parent().css( "height", $(".section-img").width() );
    $(".section-img").parent().prev().css( "height", $(".section-img").width() );
  });
  
  /*********************************************
  // Initialize social icons.
  *********************************************/
  setTimeout(function(){
    console.log("Firing social...");
    $("#sharing_icons").jsSocials({
      showLabel: false,
      showCount: false,
      shares: ["pinterest", "twitter", "facebook"]
    });
    console.log("End social...");
  }, 1500);
  /*********************************************
  // End Initializing social icons.
  *********************************************/
  
  /*********************************************
  // Ajax handling.
  *********************************************/
  $.ajax({
      type: "GET",
      url: "https://raw.githubusercontent.com/christinajohnstonweb/christinajohnstonweb.github.io/master/data/homepage.json",
      datatype: "json",
      cache: false,
      success: function(data){
        // Transform data from text to JS object.
        data = JSON.parse(data);

        //********************************************
        // Album drilldown building.
        //********************************************
        if( $("#solo_album_tmpl").length ){
          var album_name = getParameterByName("name");
          
          // Get the specific album.
          var album = $.grep(data.album, function(arr){ return arr.discName.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '') === album_name });
          album = album[0];
          
          var purchase_options = album["albumPurchase"];
          var streaming_options = album["albumStreaming"];
          
          var code = $("#solo_album_tmpl").prop("innerHTML");

          code = code.replace("!!album_name!!", album.discName);
          code = code.replace("!!album_release_date!!", album.discReleaseDate);
          code = code.replace("!!disc_cover_img!!", album.discCoverImg);
          code = code.replace("!!album_distributor!!", album.discDistributor);
          code = code.replace("!!album_descr!!", album.discDescr);
          
          var purchase_arr = [];
          var streaming_arr = [];
          
          $.each(album.albumPurchase, function(key, val){
            var li = '<div class="purchase_links"><a href="' + val.serviceLink + '" target="_BLANK"><img src="' + val.serviceLogo + '" class="coll-detail-buy-img" /></a></div>';
            
            purchase_arr.push(li);
          });
          
          code = code.replace("!!purchase_links!!", purchase_arr.join("\n"));
          
          $.each(album.albumStreaming, function(key, val){
            var li = '<div><a href="' + val.serviceLink + '" target="_BLANK"><img src="' + val.serviceLogo + '" class="coll-detail-buy-img" /></a></div>';
            
            streaming_arr.push(li);
          });
          
          code = code.replace("!!streaming_links!!", streaming_arr.join("\n"));

          $(".album-container").html(code);
        }
        //********************************************
        // End album drilldown building.
        //********************************************
        
        
        //********************************************
        // CONCERT LIST BUILDING.
        //********************************************
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
        //********************************************
        // END CONCERT LIST BUILDING.
        //********************************************
        
        
        //********************************************
        // BUILD CONCERT DETAILS
        //********************************************
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
        //********************************************
        // END BUILDING CONCERT DETAILS
        //********************************************
        
        
        //********************************************
        // Photo gallery building.
        //********************************************
        if( $(".gallery-images").length ){
          // Find the currently selected gallery.
          // Get the gallery name from the URL querystring.
          var gallery_id = getParameterByName("name", window.location.href);
        
          // Get the specific gallery.
          var gallery = $.grep(data.photoGallery, function(arr){ return arr.galleryTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '') === gallery_id });
          
          var photos = gallery[0]["photo"];
          // Instantiate an array for the image tags.
          var photo_tags = [];
          
          $.each(photos, function(idx, photo){
            var display_css;
            
            // If this is the first picture, set it visible, but otherwise hide it.
            if(idx === 0) {
              display_css = "display: inline;";
            } else {
              display_css = "display: none;";
            }

            var tag = '<img src=' + photo["picture"] + ' alt="" data-idx="' + idx + '" style="max-width: 35.0rem; max-height: 35.0rem; ' + display_css + '" class="gallery-image w-100 img-fluid" />';
            
            photo_tags.push(tag);
          });
          
          $("#photos").html(photo_tags.join("\n"));
          
          $("#photo_gallery_image_idx").text("1");
          
          $("#photo_gallery_image_count").text( photos.length );
          
          $("#photo_gallery_description").html(gallery[0]["galleryDescription"]);
          
          if ( photos.length > 1 ) {
            $("#photo_gallery_right_chevron").html('<a href="javascript:void(0);" id="photo_gallery_right_chevron_link"><span class="fa fa-3x fa-chevron-right"></span></a>');
          }
         }
        //********************************************
        // END PHOTO GALLERY BUILDING.
        //********************************************
        
        //********************************************
        // PHOTO GALLERY MASONRY.
        //********************************************
        if( $("#photo_gallery_masonry_tmpl").length > 0 ){
          var masonry_arr = [];

          $.each(data.photoGallery, function(idx, obj){
            var photo = $.grep(obj["photo"], function(arr){return arr["coverImage"] === true});
           
            console.log("Building gallery list...");
            var code = $("#photo_gallery_masonry_tmpl").prop("innerHTML");

            code = code.replace(RegExp("!!gallery_img_url!!", "g"), photo[0]["picture"]);
            code = code.replace(RegExp("!!gallery_caption!!", "g"), photo[0]["caption"]);
            code = code.replace(RegExp("!!gallery_title_link!!", "g"), obj.galleryTitle.replace(/\s/gi, '-').replace(/[^\w-]/gi, '') );
            code = code.replace(RegExp("!!gallery_title!!", "g"), obj.galleryTitle);

            masonry_arr.push(code);            
          });

//           $.when( $("#gallery_list").html(masonry_arr.join("\n")) ).done(function(){
//             console.log("In done...");
//             $(".grid").masonry();
//           });
        }
        //********************************************
        // END PHOTO GALLERY MASONRY.
        //********************************************
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