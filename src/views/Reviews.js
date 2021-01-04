import { useEffect, useState } from 'react';
import * as moviesApi from '../service/api';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    moviesApi.fetchReviews(movieId).then(({ results }) => {
      if (results.length === 0) {
        return;
      }
      setReviews(results);
    });
  }, [movieId]);
  //   console.log(reviews);

  return (
    <>
      {reviews && (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>{author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
