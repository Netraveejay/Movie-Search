import React, { useState } from "react";
import "./App.css"; 

function App() {
  const [query, setQuery] = useState(""); // user input
  const [movies, setMovies] = useState([]); // search results
  const [error, setError] = useState(""); // handle errors/no results

  const API_KEY = "f7a76a6"; 

  const searchMovies = async () => {
    if (!query) return;

    try {
      setError(""); // reset error
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No results found ");
      }
    } catch (err) {
      setError("Something went wrong. Try again!");
    }
  };

  return (
    <div className="app">
      <h1> Movie Search App</h1>

      {/* Input + Button */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {/* Error / No results */}
      {error && <p className="error">{error}</p>}

      {/* Results */}
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
            />
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
