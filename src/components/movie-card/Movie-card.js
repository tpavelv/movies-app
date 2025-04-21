import React from 'react';
import './Movie-card.css';
import { format } from 'date-fns';
import { Rate } from 'antd';

import CardTag from '../card-tag';
import MovieRating from '../movie-rating';
import Context from '../tmdb-context';

export default function MovieCard(props) {
  const {
    title,
    overview: description,
    poster_path: imgSrc,
    release_date: dateRelease,
    vote_average: ratingCount,
    genre_ids: genreIds,
    id,
    rating,
  } = props.data;
  const getImgSrc = (src) => {
    if (src) {
      return `https://image.tmdb.org/t/p/w500${src}`;
    }
    return 'https://cdn-icons-png.flaticon.com/512/4054/4054617.png';
  };

  function getFormattedDate(date) {
    if (date) {
      return format(new Date(dateRelease), 'MMMM d, yyyy');
    }
    return null;
  }

  function truncateText(inputText, containerWidth, fontStyle, containerHeight, lineHeight) {
    function getTextWidth(text) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = fontStyle;
      return context.measureText(text).width;
    }

    const avgCharWidth = getTextWidth('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') / 52;

    const charsPerLine = Math.floor(containerWidth / avgCharWidth);
    const maxLines = Math.floor(containerHeight / lineHeight);
    const maxChars = charsPerLine * maxLines;

    if (inputText.length <= maxChars) {
      return inputText;
    }

    const words = inputText.split(' ');
    let resultText = '';
    let currentLine = '';
    let lineCount = 1;
    /* eslint-disable no-plusplus */
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = getTextWidth(testLine);

      if (testWidth > containerWidth) {
        lineCount++;
        if (lineCount > maxLines) {
          resultText = `${resultText.trim()} ...`;
          break;
        }
        resultText += '\n';
        currentLine = word;
      } else {
        currentLine = testLine;
      }
      resultText += resultText.endsWith('\n') ? currentLine : ` ${word}`;
    }
    /* eslint-disable no-plusplus */
    return resultText.trim();
  }

  const formattedText = truncateText(description, 228, '12px Inter', 129, 22);
  const sessionId = localStorage.key(0);

  return (
    <Context.Consumer>
      {(value) => {
        function setRatingMovie(rateCount) {
          value.tmdbServices.setRate(id, sessionId, rateCount);
        }
        return (
          <article className="movies__card card">
            <img className="card__image" src={getImgSrc(imgSrc)} alt="movie poster"></img>
            <div className="card__content">
              <div className="card__header">
                <h5 className="card__title">{title}</h5>
                <MovieRating rating={ratingCount} />
              </div>
              <span className="card__date">{getFormattedDate(dateRelease)}</span>
              <CardTag cardGenres={genreIds} id={id} />

              <p className="card__description">{formattedText}</p>
              <Rate
                allowHalf
                value={rating}
                className="card__rating"
                count={10}
                onChange={setRatingMovie}
              />
            </div>
          </article>
        );
      }}
    </Context.Consumer>
  );
}
