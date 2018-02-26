function buildColumnedCollection(col, dataType){
  // Get the keys for the News associative array. 
  var keys = Object.keys(col);
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

    switch(dataType){
      case("news"):
        // Build the masonry brick.
        code = code.replace("!!news_image!!", data.news[x].newsImage);
        code = code.replace("!!news_caption!!", data.news[x].caption);
        code = code.replace("!!news_date!!", data.news[x].newsDate);
        code = code.replace(/!!news_title!!/g, data.news[x].newsTitle);
        code = code.replace(/!!news_title_link!!/g, data.news[x].newsTitle.toLowerCase().replace(/\s/gi, '-').replace(/[^\w-]/gi, ''));
        code = code.replace("!!news_details_preview!!", data.news[x].newsDetailsPreview);
      break;
      
      case("photos"):
        
      break;
        
      case("videos"):
        
      break;
    }

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