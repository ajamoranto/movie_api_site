(function() {

  $(function(){
  //declared variables
  let movies = $('.movies');
  let search = $('#search').val();
  let submit = $('#submit');
  let movieURL = "http://localhost:1337/movie/";
  //function to get movies
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
                <h4><a data-synopsis="${film.synopsis}" class="movieLink" href="#">${film.title}</a></h4>
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
  //opens synopsis
  movies.on("click", ".movieLink", function() {
    event.preventDefault();
    alert($(this).data("synopsis"));
  })

})
})()
