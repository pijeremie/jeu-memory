import React, {useState} from 'react';

import Reglages from './Reglages';

const Menu = ({startGame, gameOptions}) => {
  const [showMainBtns, setShowMainBtns] = useState(true); 
  const [showOptions, setShowOptions] = useState(false);

  const goBack = () => { 
    setShowOptions(false);
    setShowMainBtns(true);
  }

  const onBtnClick = (btnShowFunc) => {
    setShowMainBtns(false);
    btnShowFunc(true);
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="menu">
        <div className="text-center game-name">
          <h2>jeu de mémoire</h2>
        </div>
        <div>
          {
            showMainBtns &&
              <div className="text-center d-flex flex-column menu-btns">
                <button className="menu-btn mt-2" onClick={startGame}>jouer</button>
                <button className="menu-btn mt-2" onClick={() => onBtnClick(setShowOptions)}>règlages</button> 
              </div>
          } 
          {
            showOptions && <Reglages gameOptions={gameOptions} goBack={goBack}/>
          }
        </div>
      </div>
    </div>
  );
};

export default Menu;