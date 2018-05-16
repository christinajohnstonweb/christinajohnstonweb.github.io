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
}

// Set the home page text section height and width.
function adjustTextSections(widthMod) {
  if(widthMod === null){
    widthMod = 0;   
  }
  
  var rowWidth;
  if ($(".about-content").hasClass("col-6") || $(".news-text").hasClass("col-6")) {
    rowWidth = parseInt($("#about_row").width() || $("#news_row").width()) / 2;
  } else {
    rowWidth = parseInt($("#about_row").width() || $("#news_row").width());
  }

  $(".about-wrapper").css("height", rowWidth);
  $(".about-content").css("height", rowWidth);
  $(".about-content").css("width", rowWidth);
  $(".text-section").css("height", rowWidth - widthMod + "px");
  $(".text-section").css("width", rowWidth - widthMod + "px");
  $(".news-text").css("height", rowWidth - widthMod + "px");
  $(".news-text").css("width", rowWidth - widthMod + "px");
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
    
    // Make offwhite news background the same width as the nav.
    if( window.matchMedia("(min-width: 768px)").matches || window.matchMedia("(device-min-width: 768px)").matches ) {
      $(".news-container").width( Math.round($(".navbar").width() - 60) );
      $("#photos").width( Math.round($(".navbar").width()) );
    } else {
      $(".news-container").width( Math.round($(".navbar").width() - 80) );
      $("#photos").width( Math.round($(".navbar").width() - 8) );
    }
//     $(".off-white-bg").width( Math.round($(".navbar").width() - 60) );

    // Scale the image container for the header.
    if ($(".image-wrap").length) {
      $(".image-wrap").css("height", Math.round($(".image-wrap>img").height()));
    }

    // Once everything is loaded, show the page content.
    $('#loading_overlay').fadeOut();
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

$(".section-img").parent().prev().css("height", $(".section-img").width());

  // If videos, resize the caption
  $(".video-caption").width($(".video").width());

  resizeInstagram();
});


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
    // Video caption width.
    if ( $(".video-caption").length ) {
      $(".video-caption").width( $("section.video").width() );
    }

    // If Instagram block, resize it, too.
    resizeInstagram();
    
    // If we're on the news page, expand the gray section.
    if ($(".masonry-img").length > 0) {
      // If news, make the offwhite bg the same width as the navbar.
      if( window.matchMedia("(min-width: 768px)").matches || window.matchMedia("(device-min-width: 768px)").matches ) {
        $(".news-container").width( Math.round($(".navbar").width() - 60) );
        $("#photos").width( Math.round($(".navbar").width() - 60) );
      } else {
        $(".news-container").width( Math.round($(".navbar").width() - 80) );
        $("#photos").width( Math.round($(".navbar").width() - 80) );
      }
//       $(".off-white-bg").width( Math.round($(".navbar").width() - 60) );
      // Testing...
//       $(".off-white-bg").addClass("mx-auto");
//       $(".photos-container").width( $(".navbar").width() );
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
  }, 2000);
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
      // CONCERT LIST BUILDING.
      //********************************************
      /* if ($("#concerts_table_tmpl").length) {
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
      } */
      //********************************************
      // END CONCERT LIST BUILDING.
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
      
      //********************************************
      // Videos with set column widths building.
      //********************************************
      if ($("#video_items_tmpl").length) {
        // Get the keys for the News associative array. 
        var keys = Object.keys(data.galleryVideos);
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
        for (x = 0; x <= data.galleryVideos.length - 1; x++) {
          // Get the base template for each col + item.
          var code = $("#video_items_tmpl").prop("innerHTML");

          // Build the masonry brick.
          code = code.replace("!!video_id!!", data.galleryVideos[x].newsImage);
          code = code.replace("!!caption!!", data.galleryVideos[x].caption);
          code = code.replace("!!news_date!!", data.galleryVideos[x].newsDate);
          code = code.replace(/!!news_title!!/g, data.galleryVideos[x].newsTitle);
          code = code.replace(/!!news_title_link!!/g, data.galleryVideos[x].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, ''));
          code = code.replace("!!news_details_preview!!", data.galleryVideos[x].newsDetailsPreview);

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
      // Videos with set column widths building.
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
      accessToken: '293336116.1677ed0.74da451be9ff45ef8b2a491432b1c54b',
      resolution: "standard_resolution",
      useHttp: "true",
      limit: 5,
      template: '<div class="instagram-img-container" style=""><a href="{{link}}" target="_BLANK"><div class="img-backdrop"></div><img src="{{image}}" class="img-responsive instagram-images"/></a></div>',
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
// });