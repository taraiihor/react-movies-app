import { useState, useEffect } from 'react';
import * as moviesApi from '../service/api';
import ErrorView from './ErrorView';
import noImage from '../image/488px-No-Image-Placeholder.svg.png';

export default function CastView({ movieId }) {
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);

  // console.log(movieId);
  useEffect(() => {
    moviesApi
      .fetchCast(movieId)
      .then(({ cast }) => {
        if (cast.length === 0) {
          return Promise.reject(new Error(`Інформації немає`));
        }
        setCast(cast);
      })
      .catch(error => {
        setError(error);
      });
  }, [movieId]);
  // console.log(cast);
  return (
    <>
      {error && <ErrorView message={error.message} />}

      {cast && (
        <ul>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : noImage
                }
                alt={name}
                width="70px"
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
