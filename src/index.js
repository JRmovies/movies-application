const $ = require('jquery');
console.log($);
/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');



getMovies().then((movies) => {
  $('#loading_screen').text(`Here are all the movies: `);
  console.table(movies);
  movies.forEach(({title, rating, id}) => {
    $('#movies').append(`id#${id} - ${title} - rating: ${rating}<br>`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});

// On page load:
//
// Make an ajax request to get a listing of all the movies
// When the initial ajax request comes back, remove the "loading..." message and replace it with html generated from the json response your code receives


// Allow users to add new movies
//
// Create a form for adding a new movie that has fields for the movie's title and rating
// When the form is submitted, the page should not reload / refresh, instead, your javascript should make a POST request to /api/movies with the information the user put into the form


// Allow users to edit existing movies
//
// Give users the option to edit an existing movie
// A form should be pre-populated with the selected movie's details
// Like creating a movie, this should not involve any page reloads, instead your javascript code should make an ajax request when the form is submitted.
//
//     Delete movies
//
// Each movie should have a "delete" button
// When this button is clicked, your javascript should send a DELETE request
// Bonuses
// Add a disabled attribute to buttons while their corresponding ajax request is still pending.
//     Show a loading animation instead of just text that says "loading..."
// Use modals for the creating and editing movie forms
// Add a genre property to every movie
// Allow users to sort the movies by rating, title, or genre (if you have it)
// Allow users to search through the movies by rating, title, or genre (if you have it)
// Helpful Hints
// The id property of every movie should not be edited by hand. The purpose of this property is to uniquely identify that particular movie. That is, if we want to delete or modify an existing movie, we can specify what movie we want to change by referencing it's id. When a new movie is created (i.e. when you send a POST request to /api/movies with a title and a rating), the server will respond with the movie object that was created, including a generated id.
// Take a look at the other branches in this repository, as they have configuration/setup for common scenarios, such as including bootstrap in your application.