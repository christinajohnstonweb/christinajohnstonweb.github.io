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
  
  // Update photo gallery X of Y when slide changes.
  $('#photo_gallery_carousel').bind('slid.bs.carousel', function(e) {
    // Smooth the transition between different slide heights.
    var nextH = $(e.relatedTarget).height();
    $(this).find('.active.item').parent().animate({
        height: nextH
    }, 1000);
    
    // Update the X of Y slide counter.
    currentIndex = $('div.active').index() + 1;
   $('#photo_gallery_image_idx').html(currentIndex);
  });
  
  // Show/hide dropdown menu on hover.
  $("li.nav-item.dropdown").hover(function(){
    $(this).find(".dropdown-menu").show();
  }, function(){
    $(this).find(".dropdown-menu").hide();
  });
  
  // Load more videos on the 'Video' page.
  $("#load_more_videos_btn").click(function(){
    for(var x = 0; x < 3; x++) {
      // Get the current object.
      var item = $(".hiddenItem").first();
      
      // Nicely fade in each video.
      $(item).hide();
      $(item).removeClass("hiddenItem");
      $(item).fadeIn("slow");
    }
    
    // If we don't have any more videos to load, disable the button.
    if( $(".hiddenItem").length < 1 ){
      $("#load_more_videos_btn").toggleClass("btn-black btn-gray");
      $("#load_more_videos_btn").attr("disabled", "disabled");
    }
  });
  
  // Load more videos on the 'Video' page.
  $("#load_more_albums_btn").click(function(){
    for(var x = 0; x < 6; x++) {
      // Get the current object.
      var item = $(".hiddenItem").first();
      
      // Nicely fade in each video.
      $(item).hide();
      $(item).removeClass("hiddenItem");
      $(item).fadeIn("slow");
    }
    
    // If we don't have any more videos to load, disable the button.
    if( $(".hiddenItem").length < 1 ){
      $("#load_more_albums_btn").toggleClass("btn-black btn-gray");
      $("#load_more_albums_btn").attr("disabled", "disabled");
    }
  });
});