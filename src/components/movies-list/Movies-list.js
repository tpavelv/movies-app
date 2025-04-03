import React from 'react';

import './Movies-list.css';
import MovieCard from '../movie-card';

export default function MoviesList(props) {
  let cards = [];
  if (props.data) {
    cards = props.data.map((card) => (
      <li key={card.id}>
        <MovieCard data={card} />
      </li>
    ));
  }
  return <ul className="movies__list">{cards}</ul>;
}
