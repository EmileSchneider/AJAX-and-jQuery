function buildMovieList(movie){
  $("#movielist").append("<div class='movie'>" +"<h3>" + movie.title + "</h3>" + "<p>" + movie.opening_crawl + "</p>" + "</div>");
}

function showShips(ship) {
    $("#starshiplist").append("<div class='ship'>" + "<h3>" + ship.name + "</h3>" + "<p>" + ship.cost_in_credits + "</p>")
}

function showPilots(pilot){
  $.ajax({
    method: "GET",
    url: pilot,
    success: function(data){
      $("#pilotlist").append("<div class = 'pilot'>" + "<h3>" + data.name + "</h3>" + "<p>"+ data.gender+"</p>");
    },
    error: function(err){
      console.log(err);
    }
  });
}

$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: "https://swapi.co/api/films/",
    success: function(data) {
      data.results.forEach(function(movie){
        buildMovieList(movie);
      });
    },
    error: function(err) {
      console.log(err);
    }
  });
  $("#movielist").on("click", ".movie", function(e){
    var title = $(e.currentTarget).find('h3').text();
    $.ajax({
      method: "GET",
      url: "https://swapi.co/api/films/",
      success: function(data){
        data.results.forEach(function(movie){
          if(movie.title === title){
            $("#starshiplist").empty();
            movie.starships.forEach(function(ship){
              $.ajax({
                method: "GET",
                url: ship,
                success: function(data){
                  showShips(data);
                },
                error: function(err){
                  console.log(err);
                }
              })
            });
          }
        });
      },
      error: function(err){
        console.log(err);
      }
    })
  });

  $("#starshiplist").on("click", ".ship", function(e){
    var name = $(e.currentTarget).find('h3').text();
    console.log(name);
    $.ajax({
      method: "GET",
      url: "https://swapi.co/api/starships/",
      success: function(data){
        data.results.forEach(function(ship){
          if(ship.name === name){
            $("#pilotlist").empty();
            if(ship.pilots.length == 0){
              $("#pilotlist").append("<div class = 'pilot'>" + "<h3>" +"no pilot to show" + "</h3>");
            } else {
              ship.pilots.forEach(function(pilot){
                showPilots(pilot);
              });
            }
          }
        })
      }
    })
  })
});
