function toggleCheckboxes(item, input_property){
  var chk = $(item).find('input[property="' + input_property + '"]');

  // So strange, identical HTML response differently and needs different handling.
  if(input_property === "hiddenAlbum"){
    // Toggle the input check/unchecked.

    if($(chk).prop("checked")) {
      $(chk).removeAttr("checked");
    } else {
      $(chk).attr("checked", "checked");
    }
  } else {
    var that = $(item).find("span.fa-3x");

    // Toggle the input check/unchecked, and swap the toggle icon.
    if($(chk).prop("checked")) {
      $(chk).prop("checked", false);
//       $(that).addClass("fa-toggle-off");
//       $(that).removeClass("fa-toggle-on");
    } else {
      $(chk).prop("checked", true);
//       $(that).addClass("fa-toggle-on");
//       $(that).removeClass("fa-toggle-off");

    }
    
    // Some toggles were originally to HIDE, rather than publish.
    // Instead of checked === toggle on, unchecked === toggle off,
    // toggle based on class instead.
    if( $(that).hasClass("fa-toggle-off") ){
      $(that).addClass("fa-toggle-on");
      $(that).removeClass("fa-toggle-off");
     } else {
       $(that).addClass("fa-toggle-off");
       $(that).removeClass("fa-toggle-on");
     }
  }
}