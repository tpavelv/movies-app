import React from 'react';
import './Movie-card.css';
import { format } from 'date-fns';

export default function MovieCard(props) {
  const {
    title,
    overview: description,
    poster_path: imgSrc,
    release_date: dateRelease,
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

  return (
    <article className="movies__card card">
      <img className="card__image" src={getImgSrc(imgSrc)} alt="movie poster"></img>
      <div className="card__content">
        <h5 className="card__title">{title}</h5>
        <span className="card__date">{getFormattedDate(dateRelease)}</span>
        <div className="card__tags">
          <span className="card__tag">Action</span>
          <span className="card__tag">Drama</span>
        </div>
        <p className="card__description">{formattedText}</p>
      </div>
    </article>
  );
}
