const container = document.getElementById("container")


// when the document loads, this event triggers the fetch
document.addEventListener("DOMContentLoaded", function () {
  fetch(`http://www.omdbapi.com/?s=batman&apikey=522b0d78`)
    .then(response => response.json())
    .then(data => {
      const movieListElement = document.createElement("ul");
      container.appendChild(movieListElement)

      // let search = data.Search; is the same as let {Search} = data;
      
      // let { Search } = data;
      // movies = Search
      // movie is each movie object in the array
      
      const arrayOfMovies = data.Search;
      // create each List Item to add to the ul e.g. unordered list element
      arrayOfMovies.forEach(movie => {

        let listItem = `
        <li style="display: inline-grid;">
          <img style="height: 100px;" src="${movie.Poster}">
          <a id="${movie.imdbID}" href="">${movie.Title}</a> 
        </li>`

        movieListElement.innerHTML += listItem;
      })

      // add a click event to each list item that was created above
      arrayOfMovies.map(movie => {
        const anchorTagElem = document.getElementById(movie.imdbID)

        anchorTagElem.addEventListener("click", (event) => {
          event.preventDefault()

          fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=522b0d78`)
            .then(response => response.json())
            .then(movieDetails => {
              console.log(movieDetails)

              // could investigate to see about clearing out all html before rebuilding

              const match = document.getElementsByClassName("movie-container")[0]
              if (match) {
                match.remove()
              }

              const movieDetailsElement = document.createElement('div')
              movieDetailsElement.className = "movie-container"
              movieDetailsElement.style.height = '400px'
              movieDetailsElement.style.width = '90%'
              movieDetailsElement.style.border = 'solid 1px black'
              movieDetailsElement.style.margin = 'auto'
              container.appendChild(movieDetailsElement)

              const titleElement = document.createElement('h2')
              titleElement.innerText = movieDetails.Title
              movieDetailsElement.appendChild(titleElement)

              const imageElement = document.createElement('img')
              imageElement.style.maxHeight = '85%'
              imageElement.style.maxWidth = '300px'
              imageElement.src = movieDetails.Poster
              movieDetailsElement.appendChild(imageElement)

              const yearElement = document.createElement('p')
              yearElement.innerText = "Year: " + movieDetails.Year
              movieDetailsElement.appendChild(yearElement)

              const ratedElement = document.createElement('p')
              ratedElement.innerText = "Rated: " + movieDetails.Rated
              movieDetailsElement.appendChild(ratedElement)


              const releaseElement = document.createElement('p')
              releaseElement.innerText = "Released: " + movieDetails.Released
              movieDetailsElement.appendChild(releaseElement)

              const directorElement = document.createElement('p')
              directorElement.innerText = "Director: " + movieDetails.Director
              movieDetailsElement.appendChild(directorElement)
            })
        })
      })

    })

})

// let links = document.getElementsByClassName("link");

      
      // let movieDetails = `id="movie" href="http://www.omdbapi.com">${Search.imdbID}`
      // let example = "tt0372784"

      // link.addEventListener("click", (event) => {
      //   event.preventDefault()
      //   // fetch(`http://www.omdbapi.com/?${movieDetails}&apikey=522b0d78`)
      //   fetch(`http://www.omdbapi.com/?i=${example}&apikey=522b0d78`)
      //     .then(response => response.json())
      //     .then(data => console.log(data))
      // })
