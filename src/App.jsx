import React, { useState } from 'react'
import Search from './components/search';
import { useEffect } from 'react';
import Spinner from './components/spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}` 
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage,setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]); 
  const [loading, setLoading] = useState(false);


  const fetchMovies = async (query = '') =>{
    setLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS); 
      //alert(response.status);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      //console.log(data);

      if (data.response === 'false') {
        setErrorMessage('error fetching movies');
        setMovieList([]);
        throw new Error('Error fetching movies');
      }
    setMovieList(data.results); 
    } catch (error) {
      console.log(`${error}`);
      setErrorMessage("error fetching movies");
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      fetchMovies(searchTerm);
    }
  }, [searchTerm])
  

  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img src='src/assets/hero.png' alt="heroBG" />
            <h1>Find <span className='text-gradient'>Movies</span> which fill your soul</h1>

            <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm}/>
            <h1 className='text-white'>{searchTerm}</h1>
          </header>
          <section className='all-movies'>
            <h2 className='mt-[40px]'>all Movies</h2>

            {loading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
                <ul>
                  {movieList.map((movie) => (
                   <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default App 