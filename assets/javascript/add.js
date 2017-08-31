(function() {

$(function(){
  
  let movieURL = "http://localhost:1337/movie/";
  //ftakes form data and adds to api
  $("form").on("submit", function(event) {
    let entry = $(this).serialize();
    $.post(movieURL, $("form").serialize(), function(data) {
      alert("Added movie");
    })
  });

  })

})()
