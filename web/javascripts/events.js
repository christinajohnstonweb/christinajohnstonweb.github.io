$(function(){
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
  
  // Handle photo clicks
  $(document).on("click", ".photo-more-btn", function(e){
    e.preventDefault();
    e.stopPropagation();
    
    var loc = $(this).attr("href") + "/?name=" + $(this).data("gallery");
    window.location.href = loc;
  });
  
  // Handle news clicks
  $(document).on("click", ".news-more-btn", function(e){
    e.preventDefault();
    e.stopPropagation();
    
    var loc = $(this).attr("href") + "/?name=" + $(this).data("article");
    window.location.href = loc;
  });
  
  // Handle next gallery photo click.
  $(document).on("click", "#photo_gallery_right_chevron_link", function(){
    // Get the index of the next image to be displayed.
    var next_idx = parseInt( $(".gallery-image:visible").data("idx") ) + 1;
    
    // Hide all of the gallery images.
    $(".gallery-image").hide();
    // Show the next image in the gallery.
    $('.gallery-image[data-idx=' + next_idx + ']').show();
    
    // Check to see if the currently shown image is the last in the gallery.
    if( $(".gallery-image").last().data("idx") === next_idx ) {
      // If last, remove the hyperlink.
      $("#photo_gallery_right_chevron").html('<span class="fa fa-3x fa-chevron-right" style="color: #ddd;"></span>');
    } else {
      // If not last, add the hyperlink.
      $("#photo_gallery_right_chevron").html('<a href="javascript:void(0);" id="photo_gallery_right_chevron_link"><span class="fa fa-3x fa-chevron-right"></span></a>');
    }
    
    // Change the 'X of Y' images counter.
    $("#photo_gallery_image_idx").text(next_idx + 1);
    
    // Make the left chevron link active.
    $("#photo_gallery_left_chevron").html('<a href="javascript:void(0);" id="photo_gallery_left_chevron_link"><span class="fa fa-3x fa-chevron-left"></span></a>');
  });
  
  $(document).on("click", "#photo_gallery_left_chevron_link", function(){
    // Get the index of the previous image to be displayed.
    var prev_idx = parseInt( $(".gallery-image:visible").data("idx") - 1 );
    
    // Hide all of the gallery images.
    $(".gallery-image").hide();
    // Show the next image in the gallery.
    $('.gallery-image[data-idx=' + prev_idx + ']').show();
    
    // Check to see if the currently shown image is the first in the gallery.
    if( $(".gallery-image").first().data("idx") === prev_idx ) {
      // If first, remove the hyperlink.
      $("#photo_gallery_left_chevron").html('<span class="fa fa-3x fa-chevron-left" style="color: #ddd;"></span>');
    } else {
      // If not first, add the hyperlink.
      $("#photo_gallery_left_chevron").html('<a href="javascript:void(0);" id="photo_gallery_left_chevron_link" style="color: #ddd;"><span class="fa fa-3x fa-chevron-left"></span></a>');
    }
    
    // Change the 'X of Y' images counter.
    $("#photo_gallery_image_idx").text(prev_idx + 1);
    
    // Make the left chevron link active.
    $("#photo_gallery_right_chevron").html('<a href="javascript:void(0);" id="photo_gallery_right_chevron_link" style="color: #ddd;"><span class="fa fa-3x fa-chevron-right"></span></a>');
  });
  
  // Show/hide dropdown menu on hover.
  $("li.nav-item.dropdown").hover(function(){
    $(this).find(".dropdown-menu").show();
  }, function(){
    $(this).find(".dropdown-menu").hide();
  });
});