/*********************************************
// Global variables
*********************************************/
var current_page = current_page || "home";
/*********************************************
// Global variables
*********************************************/

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

// Set the carousel height.
function setCarouselHeight() {
  // Get the aspect ratio.
  var ar = 2728 / 1161;

  // Calculate height based on width and aspect ratio.
  $(".image-wrap").height($(".carousel-inner").width() / ar);

  // console.log("W: " + $(".carousel-inner").width() + " x H: " + $(".carousel-inner").width() / ar);
}

// Set the home page text section height and width.
function adjustTextSections() {
  var rowWidth;
  if ($(".about-content").hasClass("col-6") || $(".news-text").hasClass("col-6")) {
    rowWidth = parseInt($("#about_row").width() || $("#news_row").width()) / 2;
  } else {
    rowWidth = parseInt($("#about_row").width() || $("#news_row").width());
  }

  $(".about-wrapper").css("height", rowWidth);
  $(".about-content").css("height", rowWidth);
  $(".about-content").css("width", rowWidth);
  $(".text-section").css("height", rowWidth);
  $(".text-section").css("width", rowWidth);
  $(".news-text").css("height", rowWidth);
  $(".news-text").css("width", rowWidth);
}

$(window).on("load", function() {
  // Resize info blocks, based on width.
  setTimeout(function() {
    responsiveTest();

    // If there is a carousel, calculate the new height.
    if ($(".image-wrap").length) {
      setCarouselHeight();
    }

    // Resize the text sections on the home page.
    if ($(".text-section").length || $(".about-content").length || $(".news-text").length) {
      adjustTextSections();
    }

    // Scale the image container for the header.
    if ($(".image-wrap").length) {
      $(".image-wrap").css("height", Math.round($(".image-wrap>img").height()));
    }

    // Once everything is loaded, show the page content.
    $('#loading_overlay').fadeOut();
    //       $(".spinner").hide();
    //       $("#app_page").css("left", "0");
    //       $("#app_page").css("position", "static");
  }, 1200);

  // Zoom logo on "About" page in.
  if ($(".about-logo")) {
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
  $(".section-img").parent().prev().css("height", $(".section-img").width());

  // If videos, resize the caption
  $(".video-caption").width($(".video > iframe").width());

  resizeInstagram();

  // If we're on the news page, expand the gray section.
  if ($(".masonry-img").length > 0) {
    $(".news-container").width( $(".navbar").width() );
    $(".photos-container").width( $(".navbar").width() );
  }
// });


// $(function() {
  // JS media queries.
  $(window).on("resize", function() {
    responsiveTest();

    // If there is a carousel, calculate the new height.
    if ($(".image-wrap").length) {
      setCarouselHeight();
    }

    if ($(".text-section").length || $(".about-content").length || $(".news-text").length) {
      adjustTextSections();
    }

    // If videos, resize the caption
    $(".video-caption").width($(".video > iframe").width());

    // If Instagram block, resize it, too.
    resizeInstagram();
    
    // If we're on the news page, expand the gray section.
    if ($(".masonry-img").length > 0) {
      $(".news-container").width( $(".navbar").width() );
      $(".photos-container").width( $(".navbar").width() );
    }
  });

  // Set up the parallax "Media" section for mobile devices.
  // $("#media").stellar({ verticalScrolling: true, responsive: true, parallaxElements: true });

  /*********************************************
  // Initialize social icons.
  *********************************************/
  setTimeout(function() {
    $("#sharing_icons").jsSocials({
      showLabel: false,
      showCount: false,
      shares: ["pinterest", "twitter", "facebook"]
    });
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
    success: function(data) {
      // Transform data from text to JS object.
      data = JSON.parse(data);

      //********************************************
      // BUILD CAROUSEL SLIDERS
      //********************************************
      if ($("#carousel").length) {

        // Create an array for the carousel images.
        var car_arr = [];
        var imgs = [];
        var indicators = [];

        // Check to see what page we are on.
        switch (current_page) {
          case ("home"):
            car_arr = data.homeCarousel;
            break;

          case ("about"):
            car_arr = data.aboutCarousel;
            break;

          case ("solo"):
            car_arr = data.discographyCarousel;
            break;

          case ("featured"):
            car_arr = data.discographyCarousel;
            break;

          case ("concerts"):
            car_arr = data.concertsCarousel;
            break;

          case ("event"):
            car_arr = data.concertEventCarousel;
            break;

          case ("photos"):
            car_arr = data.photosCarousel;
            break;

          case ("videos"):
            car_arr = data.videosCarousel;
            break;

          case ("news"):
            car_arr = data.newsCarousel;
            break;

          case ("article"):
            car_arr = data.articleCarousel;
            break;

          case ("contact"):
            car_arr = data.contactCarousel;
            break;
        }

        $.each(car_arr, function(key, val) {
          // Populate the indicators array.
          var active = '';
          if (key === 0) {
            active = 'active'
          }
          indicators.push('<li data-target="#carouselExampleIndicators" data-slide-to="' + key + '" class="' + active + '"></li>');

          // Populate the images array.
          imgs.push('<div class="carousel-item ' + active + '"><div class="image-wrap"><img src="' + val.image + '" alt="' + val.image + '" class="d-block w-100" /></div></div>');
        });

        if (current_page === "home") {
          $(".carousel-indicators").html(indicators.join("\n"));
        }

        $(".carousel-inner").html(imgs.join("\n"));
      }
      //********************************************
      // END BUILDING CAROUSEL SLIDERS
      //********************************************



      //********************************************
      // Album featured collection building.
      //********************************************
      //         if( $("#featured_album_tmpl").length ){
      //           var featured_arr = [];
      //           var counter = 0;

      //           $.each(data.album, function(key, val){
      //             var code = $("#featured_album_tmpl").prop("innerHTML");

      //             // Check to see if disc is featured.
      //             if( val.discIsSolo === false ) {
      //               // If this is the 6th or higher album, hide it by default.
      //               if( counter > 5 ) {
      //                 code = code.replace("!!isHiddenItem!!", "hiddenItem");

      //                 // Make the "Load More" button visible.
      //                 $(".featured-load-more-btn").show();
      //               } else {
      //                 code = code.replace("!!isHiddenItem!!", '');
      //               }

      //               // Swap out placeholders with real values.
      //               code = code.replace("!!discCoverImg!!", val.discCoverImg);
      //               code = code.replace("!!discName!!", val.discName);
      //               code = code.replace("!!discNameStr!!", val.discName.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, ''));
      //               // Add to array.
      //               featured_arr.push(code);

      //               counter = counter + 1;
      //             }
      //           });

      //           $(".featured-albums").html(featured_arr.join("\n"));
      //         }
      //********************************************
      // End featured album collection building.
      //********************************************



      //********************************************
      // Album drilldown building.
      //********************************************
      if ($("#solo_album_tmpl").length) {
        var album_name = getParameterByName("name");

        // Get the specific album.
        var album = $.grep(data.album, function(arr) {
          return arr.discName.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '') === album_name
        });
        album = album[0];

        var purchase_options = album["albumPurchase"];
        var streaming_options = album["albumStreaming"];

        var code = $("#solo_album_tmpl").prop("innerHTML");

        code = code.replace("!!album_name!!", album.discName);
        code = code.replace("!!album_release_date!!", album.discReleaseDate);
        code = code.replace("!!disc_cover_img!!", album.discCoverImg);
        code = code.replace("!!album_distributor!!", album.discDistributor);
        code = code.replace("!!album_descr!!", album.discDescr);

        // Route back to solo or featured page, depending on album classification.
        var solo_or_featured = "featured";
        if (album.discIsSolo) {
          solo_or_featured = "solo";
        }

        code = code.replace("!!is_solo_album!!", solo_or_featured);

        var purchase_arr = [];
        var streaming_arr = [];

        // If there are no album purchase links, hide that section.
        if (album.albumPurchase[0].serviceLogo) {
          // Iterate album purchase links, and build and array of elements (str).
          $.each(album.albumPurchase, function(key, val) {
            var li = '<div class="purchase_links"><a href="' + val.serviceLink + '" target="_BLANK"><img src="' + val.serviceLogo + '" class="coll-detail-buy-img" /></a></div>';

            purchase_arr.push(li);
          });

          code = code.replace("!!purchase_links!!", purchase_arr.join("\n"));
          code = code.replace("!!album_display_buy!!", "block");
        } else {
          // Hide the option to buy albums.
          code = code.replace("!!album_display_buy!!", "none");
        }

        // If there are no album streaming links, hide that section.
        if (album.albumStreaming[0].serviceLogo) {
          // Iterate album streaming links, and build and array of elements (str).
          $.each(album.albumStreaming, function(key, val) {
            var li = '<div><a href="' + val.serviceLink + '" target="_BLANK"><img src="' + val.serviceLogo + '" class="coll-detail-buy-img" /></a></div>';

            streaming_arr.push(li);
          });

          code = code.replace("!!streaming_links!!", streaming_arr.join("\n"));
          code = code.replace("!!album_display_stream!!", "block");
        } else {
          // Hide the option to stream albums.
          code = code.replace("!!album_display_stream!!", "none");
        }

        $(".album-container").html(code);
      }
      //********************************************
      // End album drilldown building.
      //********************************************


      //********************************************
      // CONCERT LIST BUILDING.
      //********************************************
      if ($("#concerts_table_tmpl").length) {
        // Concerts layout, since Mavo.io won't support 2 references to the same collection on a page.
        // NOTE: Referenced templates are embedded in includes/concerts.html 

        var tbls = [];
        var cards = [];

        var tickets = [];

        $.each(data.concerts, function(key, val) {
          if (val.featuredConcert && !val.hiddenConcert) {
            // if( val.featuredConcert && val.hiddenConcert != "true" ){
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
            concert_tbl = concert_tbl.replace(RegExp("!!concert_key!!", "g"), key);

            concert_card = concert_card.replace(RegExp("!!concert_img!!", "g"), val.concertLocImg);
            concert_card = concert_card.replace(RegExp("!!concert_date!!", "g"), val.concertDatetime);
            concert_card = concert_card.replace(RegExp("!!concert_name!!", "g"), val.concertName);
            concert_card = concert_card.replace(RegExp("!!concert_venue!!", "g"), val.concertVenue);
            concert_card = concert_card.replace(RegExp("!!concert_location!!", "g"), val.concertLocation);
            concert_card = concert_card.replace(RegExp("!!concert_ticket_url!!", "g"), val.concertTicketsURL);
            concert_card = concert_card.replace(RegExp("!!concert_more_info!!", "g"), val.discDistributor);
            concert_card = concert_card.replace(RegExp("!!concert_event!!", "g"), event_name);
            concert_card = concert_card.replace(RegExp("!!concert_key!!", "g"), key);

            // Check if there are tickets for sale.
            if (!val.concertTicketsURL || val.concertTicketsURL.length < 1) {
              tickets.push(key);
            }

            tbls.push(concert_tbl);
            cards.push(concert_card);
          }
        });

        $("#concert_tables_content").html(tbls);
        $("#cards_concert_content").html(cards);

        // Iterate concerts and hide buy buttons without a URL.
        $.each(tickets, function(k, v) {
          $('[data-id=' + v + ']').hide();
        });
      }
      //********************************************
      // END CONCERT LIST BUILDING.
      //********************************************


      //********************************************
      // BUILD CONCERT DETAILS
      //********************************************
      if ($("#concert_tmpl").length) {
        var concert_name = getParameterByName("name");

        $.each(data.concerts, function(key, val) {
          /* Solo/featured albums. */
          var name = val.concertName.toLowerCase() + " " + val.concertLocation.toLowerCase();
          name = name.replace(/\s/gi, '-').replace(/[^\w-]/gi, '');

          if (name === concert_name) {
            var code = $("#concert_tmpl").prop("innerHTML");

            code = code.replace(RegExp("!!concert_name!!", "g"), val.concertName);
            code = code.replace(RegExp("!!concert_date_time!!", "g"), val.concertDatetime);
            code = code.replace(RegExp("!!concert_venue!!", "g"), val.concertVenue);
            code = code.replace(RegExp("!!concert_descr!!", "g"), val.concertDetails);
            code = code.replace(RegExp("!!concert_location!!", "g"), val.concertLocation);

            $(".concert-container").html(code);

            if (!val.concertTicketsURL || val.concertTicketsURL.length < 1) {
              $('[data-id="featured_concert"]').hide();
            }
          }
        });
      }
      //********************************************
      // END BUILDING CONCERT DETAILS
      //********************************************


      //********************************************
      // Photos list building.
      //********************************************
      if ($("#photos_items_tmpl").length) {
        // Get the keys for the News associative array. 
        var keys = Object.keys(data.photoGallery);
        var three_col = {
          col_1: [],
          col_2: [],
          col_3: [],
          str_1: "",
          str_2: "",
          str_3: ""
        };
        var two_col = {
          col_1: [],
          col_2: [],
          str_1: "",
          str_2: ""
        };
        var single_col = {
          col: [],
          str: ""
        };

        // Init the iteration counter.
        var counter = 1;
        var col_counter_2 = "col_1";

        // Iterate the news items and build the Bootstrap masonry.
        for (x = 0; x <= data.photoGallery.length - 1; x++) {
          // Get the base template for each col + item.
          var code = $("#photos_items_tmpl").prop("innerHTML");

          // Build the masonry brick.
          // Iterate the photos in the gallery.
          $.each(data.photoGallery[x].photo, function(key, val) {
            if (val.coverImage) {
              code = code.replace("!!picture!!", val.picture);
              code = code.replace("!!caption!!", val.caption);
            }
          });

          code = code.replace(/!!gallery_title!!/g, data.photoGallery[x].galleryTitle);
          code = code.replace(/!!gallery_title_link!!/g, data.photoGallery[x].galleryTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, ''));

          // Build the three col masonry.
          switch (counter) {
            case 1:
              three_col["col_1"].push(code);
              two_col[col_counter_2].push(code);
              single_col["col"].push(code);
              break;

            case 2:
              three_col["col_2"].push(code);
              two_col[col_counter_2].push(code);
              single_col["col"].push(code);
              break;

            case 3:
              three_col["col_3"].push(code);
              two_col[col_counter_2].push(code);
              single_col["col"].push(code);
              break;
          }

          if (counter === 3) {
            counter = 1;
          } else {
            counter = counter + 1;
          }

          // Toggle col on 2 col layout.
          if (col_counter_2 === "col_1") {
            col_counter_2 = "col_2"
          } else {
            col_counter_2 = "col_1"
          }
        }

        // Build the col strings from the arrays.
        three_col["str_1"] = '<div class="col-4" property="photoGallery" style="margin-bottom: 50px;">' + three_col["col_1"].join("\n") + '</div>';
        three_col["str_2"] = '<div class="col-4" property="photoGallery" style="margin-bottom: 50px;">' + three_col["col_2"].join("\n") + '</div>';
        three_col["str_3"] = '<div class="col-4" property="photoGallery" style="margin-bottom: 50px;">' + three_col["col_3"].join("\n") + '</div>';
        $("#three_col_str").html('<div class="row">' + three_col["str_1"] + three_col["str_2"] + three_col["str_3"] + '</row>');

        two_col["str_1"] = '<div class="col-6" property="photoGallery" style="margin-bottom: 50px;">' + two_col["col_1"].join("\n") + '</div>';
        two_col["str_2"] = '<div class="col-6" property="photoGallery" style="margin-bottom: 50px;">' + two_col["col_2"].join("\n") + '</div>';
        $("#two_col_str").html('<div class="row">' + two_col["str_1"] + two_col["str_2"] + '</row>');

        //           single_col["str"] = '<div class="col-12" property="photoGallery" style="margin-bottom: 50px;">' + three_col["col_1"].join("\n") + three_col["col_2"].join("\n") + three_col["col_3"].join("\n") + '</div>';
        single_col["str"] = '<div class="col-12" property="photoGallery" style="margin-bottom: 50px;">' + single_col["col"].join("\n") + '</div>';
        $("#single_col_str").html('<div class="row">' + single_col["str"] + '</row>');

      }
      //********************************************
      // End photos list building.
      //********************************************


      //********************************************
      // Photo gallery building.
      //********************************************
      if ($(".gallery-images").length) {
        // Find the currently selected gallery.
        // Get the gallery name from the URL querystring.
        var gallery_id = getParameterByName("name", window.location.href);

        // Get the specific gallery.
        var gallery = $.grep(data.photoGallery, function(arr) {
          return arr.galleryTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '') === gallery_id
        });

        var photos = gallery[0]["photo"];
        // Instantiate an array for the image tags.
        var photo_tags = [];

        $.each(photos, function(idx, photo) {
          var display_css;

          // If this is the first picture, set it visible, but otherwise hide it.
          if (idx === 0) {
            display_css = "display: inline;";
          } else {
            display_css = "display: none;";
          }

          // If this is the first photo, set it as active.
          var active_item;
          if (idx === 0) {
            active_item = " active";
          } else {
            active_item = "";
          }

          // Build the Bootstrap carousel div+img.
          var tag = '<div class="carousel-item' + active_item + '"><img src=' + photo["picture"] + ' style="object-fit: contain;" alt="" class="gallery-image img-fluid" /></div>';

          // Adding to array of BS carousel items.
          photo_tags.push(tag);
        });

        // Populate carousel on page.
        $(".photo-gallery-carousel").html(photo_tags.join("\n"));

        // Populate X in X of Y counter.
        $("#photo_gallery_image_idx").text("1");

        // Populate Y in X of Y counter.
        $("#photo_gallery_image_count").text(photos.length);

        // Update the gallery description on the page.
        $("#photo_gallery_description").html(gallery[0]["galleryDescription"]);

        //           if ( photos.length > 1 ) {
        //             $("#photo_gallery_right_chevron").html('<a href="javascript:void(0);" id="photo_gallery_right_chevron_link"><span class="fa fa-3x fa-chevron-right"></span></a>');
        //           }
      }
      //********************************************
      // END PHOTO GALLERY BUILDING.
      //********************************************


      //********************************************
      // News list building.
      //********************************************
      if ($("#news_items_tmpl").length) {
        // Get the keys for the News associative array. 
        var keys = Object.keys(data.news);
        var three_col = {
          col_1: [],
          col_2: [],
          col_3: [],
          str_1: "",
          str_2: "",
          str_3: ""
        };
        var two_col = {
          col_1: [],
          col_2: [],
          str_1: "",
          str_2: ""
        };
        var single_col = {
          col: [],
          str: ""
        };

        // Init the iteration counter.
        var counter = 1;
        var col_counter_2 = "col_1";

        // Iterate the news items and build the Bootstrap masonry.
        for (x = 0; x <= data.news.length - 1; x++) {
          // Get the base template for each col + item.
          var code = $("#news_items_tmpl").prop("innerHTML");

          // Build the masonry brick.
          code = code.replace("!!news_image!!", data.news[x].newsImage);
          code = code.replace("!!news_caption!!", data.news[x].caption);
          code = code.replace("!!news_date!!", data.news[x].newsDate);
          code = code.replace(/!!news_title!!/g, data.news[x].newsTitle);
          code = code.replace(/!!news_title_link!!/g, data.news[x].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, ''));
          code = code.replace("!!news_details_preview!!", data.news[x].newsDetailsPreview);

          // Build the three col masonry.
          switch (counter) {
            case 1:
              three_col["col_1"].push(code);
              two_col[col_counter_2].push(code);
              single_col["col"].push(code);
              break;

            case 2:
              three_col["col_2"].push(code);
              two_col[col_counter_2].push(code);
              single_col["col"].push(code);
              break;

            case 3:
              three_col["col_3"].push(code);
              two_col[col_counter_2].push(code);
              single_col["col"].push(code);
              break;
          }

          if (counter === 3) {
            counter = 1;
          } else {
            counter = counter + 1;
          }

          // Toggle col on 2 col layout.
          if (col_counter_2 === "col_1") {
            col_counter_2 = "col_2"
          } else {
            col_counter_2 = "col_1"
          }
        }


        // Build the col strings from the arrays.
        three_col["str_1"] = '<div class="col-4" style="margin-bottom: 50px;">' + three_col["col_1"].join("\n") + '</div>';
        three_col["str_2"] = '<div class="col-4" style="margin-bottom: 50px;">' + three_col["col_2"].join("\n") + '</div>';
        three_col["str_3"] = '<div class="col-4" style="margin-bottom: 50px;">' + three_col["col_3"].join("\n") + '</div>';
        $("#three_col_str").html('<div class="row">' + three_col["str_1"] + three_col["str_2"] + three_col["str_3"] + '</row>');

        two_col["str_1"] = '<div class="col-6" style="margin-bottom: 50px;">' + two_col["col_1"].join("\n") + '</div>';
        two_col["str_2"] = '<div class="col-6" style="margin-bottom: 50px;">' + two_col["col_2"].join("\n") + '</div>';
        $("#two_col_str").html('<div class="row">' + two_col["str_1"] + two_col["str_2"] + '</row>');

        single_col["str"] = '<div class="col-12" style="margin-bottom: 50px;">' + single_col["col"].join("\n") + '</div>';
        $("#single_col_str").html('<div class="row">' + single_col["str"] + '</row>');
      }
      //********************************************
      // End news list building.
      //********************************************


      //********************************************
      // News article building.
      //********************************************
      if ($("#article_tmpl").length) {
        var article_name = getParameterByName("name");

        // Get the specific article.
        var article = $.grep(data.news, function(arr) {
          return arr.newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '') === article_name
        });
        article = article[0];

        // Get the << PREV and NEXT >> links.
        var prev_link;
        var next_link;

        for (x = 0; x <= data.news.length - 1; x++) {
          if (data.news[x].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '') === article_name) {
            // Handle when we are on the first result.
            if (x === 0) {
              prev_link = data.news[data.news.length - 1].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '');
              next_link = data.news[x + 1].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '');
            } else {
              // Handle when we are on the last result.
              if (x === data.news.length - 1) {
                prev_link = data.news[x - 1].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '');
                next_link = data.news[0].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '');
              } else { // Neither first nor last result.
                prev_link = data.news[x - 1].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '');
                next_link = data.news[x + 1].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, '');
              }
            }
          }
        }

        // Swap out placeholders with values.
        var code = $("#article_tmpl").prop("innerHTML");

        code = code.replace("!!news_image!!", article.newsImage);
        code = code.replace("!!news_title!!", article.newsTitle);
        code = code.replace("!!news_date!!", article.newsDate);
        code = code.replace("!!article_details!!", article.newsDetails);
        code = code.replace("!!previous_article!!", prev_link);
        code = code.replace("!!next_article!!", next_link);

        // Write the modified code to the DOM.
        $(".article-container").html(code);
      }
      //********************************************
      // End news article building.
      //********************************************
    },
    error: function(data) {

    }
  });
  /*********************************************
  // End ajax handling.
  *********************************************/

  /*********************************************
  // Instagram handling.
  *********************************************/
  if ($("#instagram").length) {
    //       UID = 293336116
    var feed = new Instafeed({
      get: 'user',
      userId: '293336116',
      //         userId: '1593628250',
      //         accessToken: '1593628250.1677ed0.02eb61b5a3104a83a39d83495e534ed9',
      accessToken: '293336116.1677ed0.74da451be9ff45ef8b2a491432b1c54b',
      resolution: "standard_resolution",
      useHttp: "true",
      limit: 5,
      template: '<div class="instagram-img-container" style=""><a href="{{link}}" target="_BLANK"><div class="img-backdrop"></div><img src="{{image}}" class="img-responsive instagram-images"/></a></div>',
      //         template: '<div class="instagram-img-container" style=""><a href="{{link}}" target="_BLANK"><div class="img-featured-container d-flex flex-wrap"><div class="img-backdrop"></div><img src="{{image}}" class="img-responsive instagram-images"/></div></a></div>',
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