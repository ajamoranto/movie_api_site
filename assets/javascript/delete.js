(function() {

  $(function(){

  let movies = $('.movies');
  let search = $('#search').val();
  let submit = $('#submit');
  let movieURL = "http://localhost:1337/movie/";
  let thisMovie;

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
                <h4><a data-filmid="${film.id}" data-delete="Are you sure you want to delete ${film.title}?" class="movieLink" href="#">${film.title}</a></h4>
              </div>
            </div>
          </div>
        `)
      })
      $('#search').val('')
    })
  }
  getMovies(movieURL);

  movies.on("click", ".movieLink", function() {
    thisMovie = $(this).data("filmid");
    if (confirm($(this).data("delete"))){
      $.ajax({
        url: movieURL+thisMovie,
        type: 'DELETE',
        success: function(result){
          getMovies(movieURL);
          alert("It's gone now...");
        }
      })
    }
  })

})
})()
