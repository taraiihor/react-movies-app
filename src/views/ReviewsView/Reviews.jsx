import { useEffect, useState } from 'react';
import * as moviesApi from '../../service/api';
import ErrorView from '../ErrorView';
import s from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    moviesApi
      .fetchReviews(movieId)
      .then(({ results }) => {
        if (results.length === 0) {
          return Promise.reject(new Error(`Інформації немає`));
        }
        setReviews(results);
      })
      .catch(error => {
        setError(error);
      });
  }, [movieId]);
  //   console.log(reviews);

  return (
    <>
      {error && <ErrorView message={error.message} />}
      {reviews && (
        <ul className={s.list}>
          {reviews.map(({ id, author, content }) => (
            <li className={s.item} key={id}>
              <p>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
