import React from 'react';

import './card-tag.css';
import Context from '../tmdb-context';

function createTags(genresArr, cardGenreArr, id) {
  let tags = [];
  tags = cardGenreArr.map((el) => (
    <span className="card__tag" key={id + el}>
      {genresArr[el]}
    </span>
  ));
  return tags;
}

function CardTag(props) {
  const { id, cardGenres } = props;
  return (
    <Context.Consumer>
      {(value) => <div className="card__tags">{createTags(value, cardGenres, id)}</div>}
    </Context.Consumer>
  );
}
export default CardTag;
