import React from 'react'

const MovieCard = ({movie:{ title , vote_average, poster_path, release_date, original_language }}) => {
  return (
    <div className='movie-card'>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
        <div className='mt-4'>
            <h3>{title}</h3>
            <div className='content'>
                <div className='rating'>
                    <img src="src/assets/star.svg" alt="star"/>
                    <p>{vote_average.toFixed(1)}</p>
                </div>

                <span>😶</span>
                <p className='lang'>{original_language}</p>

                <span>😶</span>
                <p className='year'>{release_date}</p>
            </div>
        </div>
    </div>    
  )
}

export default MovieCard