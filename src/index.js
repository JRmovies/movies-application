const $ = require('jquery');
/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies, addMovie, deleteMovie} = require('./api.js');


//-----------------------------------------------On page load:--------------------------------------------------------//
//---------------------------Make an ajax request to get a listing of all the movies----------------------------------//
//----------------------When the initial ajax request comes back, remove the "loading..."-----------------------------//
//--------------message and replace it with html generated from the json response your code receives------------------//


    getMovies().then((movies) => {
        renderMovies (movies);
        console.table(movies);
        $('#forms').show()
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });

function renderMovies (movies) {
        $("#movies").html('');
        $('#loading_screen').html(`<h2>Here are all of the movies: </h2>`);
        movies.forEach(({title, rating, id}) => {
            $('#movies').append(
            `<div class="card">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                        <p class="card-text">ID # ${id}</p>
                        <p class="card-text">Rating: ${rating}</p>
                    <button class="delete btn btn-primary" value="${id}">Delete</button>
                </div>
            </div>`)
        });
}

function appendMovie(movie) {
    const {id, title, rating} = movie;
    $('#movies').append(
        `<div class="card">
             <div class="card-body">
                <h5 class="card-title">${title}</h5>
                    <p class="card-text">ID # ${id}</p>
                    <p class="card-text">Rating: ${rating}</p>
                <button class="delete btn btn-primary" value="${id}">Delete</button>
            </div>
         </div>`);
}


//-------------------------------------------------ADD A MOVIE--------------------------------------------------------//


function addAMovie() {
    const newMovie = {title: newTitle.value, rating: newRating.value};
    addMovie(newMovie)
    .then(function (movie){
        console.log(movie);
        appendMovie(movie);
    })
        .catch((error) => {
            alert(error);
        });
}


//-----------------------------------------------DELETE A MOVIE-------------------------------------------------------//


function deleteAMovie(num) {
    const {id} = num;
    deleteMovie(num)
        .then(function(){
            getMovies().then((movies) => {
                renderMovies (movies);
                console.table(movies);
            }).catch((error) => {
                alert('Oh no! Something went wrong.\nCheck the console for details.');
                console.log(error);
            });
        })
        .catch((error) => {
            alert(error);
        })
}


//--------------------------------------------------ADD-SUBMIT--------------------------------------------------------//


$('#movieSubmit').click(function(e){
    e.preventDefault();
    addAMovie();
});


//------------------------------------------------DELETE BUTTON-------------------------------------------------------//


$('#movies').on('click', '.delete', function (){
    deleteAMovie($(this).val());
});


//-----------------------------------------------------IMDB-----------------------------------------------------------//


$('#searchForm').on('submit', function(e){
    e.preventDefault();
    let searchText = $('#searchText').val();
    console.log(searchText);
    searchMovie(searchText);
});

function searchMovie(searchText){
    $.ajax({
    url: 'http://www.omdbapi.com/?s='+ searchText + '&plot=full' + '&apikey=dd57b49',
    type: 'GET',
    success: function(data){

        /*
        [Poster, Title, Type, Year, imdbID]
         */

        var x= $('<ul>');
        data.Search.forEach(function (v) {
          x.append($('<li>').append("<a href='https://www.imdb.com/title/" + v.imdbID + "/?ref_=fn_al_tt_1'>" + v.Title + "</a>" + ' ' + v.Year + ' '))
        });
            $(document.body).append(x);
            console.log(data);
            },
                error: function(){
                    alert(error);
                }
        });
}


//--------------------------------------------------------------------------------------------------------------------//


// Allow users to edit existing movies
//
// Give users the option to edit an existing movie
// A form should be pre-populated with the selected movie's details
// Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.


//
// Bonuses
// Add a disabled attribute to buttons while their corresponding ajax request is still pending.
// Use modals for the creating and editing movie forms
// Add a genre property to every movie
// Allow users to sort the movies by rating, title, or genre (if you have it)
// Allow users to search through the movies by rating, title, or genre (if you have it)
// Helpful Hints
// The id property of every movie should not be edited by hand. The purpose of this property is to uniquely identify that particular movie. That is, if we want to delete or modify an existing movie, we can specify what movie we want to change by referencing it's id. When a new movie is created (i.e. when you send a POST request to /api/movies with a title and a rating), the server will respond with the movie object that was created, including a generated id.
// Take a look at the other branches in this repository, as they have configuration/setup for common scenarios, such as including bootstrap in your application.