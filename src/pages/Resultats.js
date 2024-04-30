import React from 'react';
import {formatTime} from "../components/TimeFormat";

const Resultats = ({gameResult, size, goToMenu}) => {
  const clicks = gameResult.score + gameResult.fails;
  const total = ((gameResult.score/clicks)*100).toFixed();
  return (
    <div className="d-flex justify-content-center">
      <div className="menu d-flex justify-content-center flex-column">
        <div className="game-name">
          <h2>résultats</h2>
        </div>
        <div className="description">
          <p>taille : {size}x{size}</p>
          <p>durée totale : {formatTime(gameResult.time)}</p>
          <p>nombre de tentatives : {clicks}</p>
          <p>nombre de tentatives ratées : {gameResult.fails}</p>
          <p>score total : {total}%</p>
        </div>
        <button className="menu-btn mt-2" onClick={goToMenu}>menu</button>
      </div>
    </div>
  );
};

export default Resultats;