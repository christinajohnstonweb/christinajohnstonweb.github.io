$(function(){
  /********************************************
  // Effects.
  *********************************************/
  setTimeout(function(){
    $(".about-logo").addClass("about-logo-scale");
  }, 1500);
  
  
  // Custom "Active" state for navbar menu.
  var uri = window.location.href.split("?")[0];
  var page;
  
  if(uri[uri.length - 1] == "/") {
    page = uri.split("/")[uri.split("/").length - 2];
  } else {
    page = uri.split("/")[uri.split("/").length - 1];
  }
  
  switch(page){
      case("about"):
        $('.nav-link:contains("ABOUT")').addClass("active");
      break;
      
      case("solo"):
        $('.nav-link:contains("DISCOGRAPHY")').addClass("active");
      break;
      
      case("featured"):
        $('.nav-link:contains("DISCOGRAPHY")').addClass("active");
      break;
      
      case("concerts"):
        $('.nav-link:contains("CONCERTS")').addClass("active");
      break;
      
      case("photos"):
        $('.nav-link:contains("MEDIA")').addClass("active");
      break;
      
      case("videos"):
        $('.nav-link:contains("MEDIA")').addClass("active");
      break;
      
      case("news"):
        $('.nav-link:contains("NEWS")').addClass("active");
      break;
      
      case("article"):
        $('.nav-link:contains("NEWS")').addClass("active");
      break;
      
      case("contact"):
        $('.nav-link:contains("CONTACT")').addClass("active");
      break;
    }
  // End navbar 'Active' handling.
});  