import React from 'react';
// import Alert from 'antd/es/alert/Alert';

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
  } else {
    // cards = <Alert message="Error Text" type="error" />;
  }
  const notFound = <span>Результаты не найдены</span>;
  return (
    <ul className="movies__list">
      {cards.length ? cards : notFound}
      {/* {cards}
      {notFound} */}
    </ul>
  );
}
