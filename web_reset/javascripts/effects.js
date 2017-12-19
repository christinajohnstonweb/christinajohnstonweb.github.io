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
        current_page = "about";
      break;
      
      case("solo"):
        $('.nav-link:contains("DISCOGRAPHY")').addClass("active");
        current_page = "solo";
      break;
      
      case("featured"):
        $('.nav-link:contains("DISCOGRAPHY")').addClass("active");
        current_page = "featured";
      break;
      
      case("concerts"):
        $('.nav-link:contains("CONCERTS")').addClass("active");
        current_page = "concerts";
      break;
      
      case("photos"):
        $('.nav-link:contains("MEDIA")').addClass("active");
        current_page = "photos";
      break;
      
      case("videos"):
        $('.nav-link:contains("MEDIA")').addClass("active");
        current_page = "videos";
      break;
      
      case("news"):
        $('.nav-link:contains("NEWS")').addClass("active");
        current_page = "news";
      break;
      
      case("article"):
        $('.nav-link:contains("NEWS")').addClass("active");
        current_page = "article";
      break;
      
      case("contact"):
        $('.nav-link:contains("CONTACT")').addClass("active");
        current_page = "contact";
      break;
      
      default:
        current_page = "home";
      break;
    }
  // End navbar 'Active' handling.
});  