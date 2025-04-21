import React from 'react';
import './movie-rating.css';

function MovieRating(props) {
  const { rating } = props;
  const rounded = Number(rating.toFixed(1));
  let className = 'card__movie-rating ';

  switch (true) {
    case rating <= 3:
      className += 'card__movie-rating--low';
      break;

    case rating > 3 && rating <= 5:
      className += 'card__movie-rating--middle-low';

      break;
    case rating > 5 && rating <= 7:
      className += 'card__movie-rating--middle';

      break;
    case rating > 7:
      className += 'card__movie-rating--hight';

      break;
    default:
      break;
  }
  return <span className={className}>{rounded}</span>;
}
export default MovieRating;
