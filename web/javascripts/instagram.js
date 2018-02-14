function resizeInstagram(){
  if ((window.matchMedia("(min-width: 991px)").matches || window.matchMedia("(device-min-width: 991px)").matches)) {
    // If Instagram block, resize it, too.
    $(".instagram-images").width(Math.round(($(".navbar").width() + 20) / 5));
    $(".instagram-images").height(Math.round(($(".navbar").width() + 20) / 5));
  } else {
    // if ((window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(device-max-width: 768px)").matches)) {
      $(".instagram-images").width(Math.round(($(".navbar").width() + 20) / 4));
      $(".instagram-images").height(Math.round(($(".navbar").width() + 20) / 4));
    // }
  }
}

$(function(){
  
});