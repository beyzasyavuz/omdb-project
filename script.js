const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const movieResult = document.getElementById("movieResult");
const message = document.getElementById("message");

const API_KEY = "cf5caad7";

searchBtn.addEventListener("click", function () {
  const movieName = movieInput.value.trim();

  if (movieName === "") {
    message.textContent = "Please enter a movie name.";
    movieResult.innerHTML = "";
    return;
  }

  fetchMovie(movieName);
});

movieInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

window.addEventListener("load", function () {
  const lastMovie = localStorage.getItem("lastMovie");
  if (lastMovie) {
    fetchMovie(lastMovie);
    movieInput.value = lastMovie;
  }
});

async function fetchMovie(movieName) {
  try {
    message.textContent = "Loading...";
    movieResult.innerHTML = "";

    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}`);
    const data = await response.json();

    if (data.Response === "False") {
      message.textContent = data.Error;
      movieResult.innerHTML = "";
      return;
    }

    message.textContent = "";

    movieResult.innerHTML = `
      <div class="movie-card">
        <img src="${data.Poster}" alt="${data.Title}">
        <h2>${data.Title}</h2>
        <p><strong>Year:</strong> ${data.Year}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
      </div>
    `;

    localStorage.setItem("lastMovie", movieName);
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    movieResult.innerHTML = "";
  }
}