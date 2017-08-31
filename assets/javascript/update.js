(function() {

  $(function(){
  //declared variables
  let movies = $('.movies');
  let search = $('#search').val();
  let submit = $('#submit');
  let movieURL = "http://localhost:1337/movie/";
  let thisMovie;
  //get movies function
  function getMovies(url) {

    $.get(url, function(data) {
      $('.movies').empty();
      let films = data;
      $.each(films, function(index, film) {
        movies.append(`
          <div class="col-sm-6 col-md-3">
            <div class="thumbnail">
              <img src="${film.poster}" alt="${film.title}">
              <div class="caption">
                <h4><a data-filmid="${film.id}" data-synopsis="${film.synopsis}" class="movieLink" href="#form">${film.title}</a></h4>
                <p><b>Genre:</b> ${film.genre}</p>
                <p><b>Released:</b> ${film.releaseYear}</p>
                <p><b>Run time:</b> ${film.runTime}</p>
              </div>
            </div>
          </div>
        `)
      })
      $('#search').val('')
    })
  }
  //calling get movies function
  getMovies(movieURL);


  //updates form after movie is selected
  movies.on("click", ".movieLink", function() {
    thisMovie = $(this).data("filmid");
    $.get(movieURL + thisMovie, function(data) {
      let films = data;
      $.each(data, function(name, val) {
        let $el = $('[name="' + name + '"]'),
          type = $el.attr('type');

        switch (type) {

          default: $el.val(val);
        }
      });

    })
  })

  //pushes update to api
  $("form").on("submit", function(event) {
    event.preventDefault()
    let entry = $(this).serialize();
    $.ajax({
      url: movieURL + thisMovie,
      type: 'PUT',
      data: entry,
      success: function(result){
        //alerts successful and reloads movies
        alert("Updated");
        getMovies(movieURL);
        $("form")[0].reset();
      }
    })
  });



})




})()
