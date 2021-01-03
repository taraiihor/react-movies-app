import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../service/api';

export default function MoviedetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    moviesApi.fetchMoviesId(movieId).then(setMovie);
  }, [movieId]);
  return (
    <>
      {movie && (
        <>
          <p>{`${movie.title}`}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width="200px"
          />
          <p>{`${movie.overview}`}</p>
          <p>{`${movie.release_date}`}</p>
          <p>{`${movie.vote_average}`}</p>
          <p>{`${movie.genres.map(genre => genre.name).join(', ')}`}</p>
        </>
      )}
    </>
  );
}
