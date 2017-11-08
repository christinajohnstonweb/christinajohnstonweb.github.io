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
    console.log("Test");
    e.preventDefault();
    e.stopPropagation();
    
    var loc = $(this).attr("href") + "/?name=" + $(this).data("gallery");
    window.location.href = loc;
  });
});