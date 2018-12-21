module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
    addMovie: function(movie){
        const url = '/api/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        };

        return fetch(url, options)
            .then(function(response) {
                return response.json();
            })
    },
    deleteMovie: function(id){
        const url = `/api/movies/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return fetch(url, options)
            .then(function(response) {
                return response.json();
            })
    }
};

