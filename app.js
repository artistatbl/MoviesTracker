let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch data from the API
const getMovie = () => {
  let movieName = movieNameRef.value; // Use .value instead of .ariaValueMax to get the input value
  let year = document.getElementById("year").value;

  let url = `https://www.omdbapi.com/?t=${movieName}&y=${year}&apikey=${key}`;

  // If input field is empty
  if (movieName === "") {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
    return;
  }

  // Fetch data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        // Display movie details
        result.innerHTML = `
          <div class="info">
            <img src="${data.Poster}" class="poster">
            <div>
              <h2>${data.Title}</h2>
              <div class="rating">
                <img src="star-icon.svg">
                <h4>${data.imdbRating}</h4>
              </div>
              <div class="details">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
              </div class= "contact">
              <h3 class="">Votes & Director </h3>
              <span>${data.Metascore}</span>
              <span>${data.imdbVotes}</span>
              <span>${data.Director}</span>
              <div>
              </div>
              <div class="genre">
                ${data.Genre.split(",").join("<div></div>")} 
              </div>
            </div>
          </div>
          <h3>Plot:</h3>
          <p>${data.Plot}</p>
          <h3>Cast:</h3>
          <p>${data.Actors}</p>
          <h3>Language:</h3>
          <p>${data.Language}</p>
        `;
      } else {
        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "An error occurred while fetching the movie.";
    });
};

// Event listener for the search button
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
