import React, {useMemo, useRef, useState} from 'react';

import Tableau from "../components/Tableau"; 
import Timer from "../components/Timer";

const Partie = ({size, content, endGame, goToMenu}) => {
  const [cells, setCells] = useState(content); 
  const [loading, setLoading] = useState(false); 

  const game = useRef({clickCells: [], results: {score: 0, fails: 0, time: 0}});

  const finishScore = useMemo(() => size ** 2 / 2, [size]);

  const checkIsWin = () => {
    return game.current.results.score === finishScore;
  }

  const toggleProperty = (cellIndex, propertyName, propertyValue) => {
    let cellsTemp;
    if (Array.isArray(cellIndex)) {
      cellsTemp = cells.map((element, index) => cellIndex.includes(index) ? {
        ...element,
        [propertyName]: propertyValue
      } : element);
    } else {
      cellsTemp = cells.map((element, index) => index === cellIndex ? {
        ...element,
        [propertyName]: propertyValue
      } : element);
    }
    setCells(cellsTemp);
  } 
 
  const hideCell = (cellIndex) => {
    toggleProperty(cellIndex, "done", true);
  }

  const closeCell = (cellIndex) => {
    toggleProperty(cellIndex, "open", false);
  }

  const openCell = (cellIndex) => {
    toggleProperty(cellIndex, "open", true);
  }

  const isCellEqual = (cellIndex1, cellIndex2) => {
    return cells[cellIndex1].id === cells[cellIndex2].id;
  }

  const isSameCell = (cellIndex) => {
    return game.current.clickCells.length && game.current.clickCells[0] === cellIndex;
  }

  const resetClickCells = () => {
    game.current = {...game.current, clickCells: []};
  }


  const handleClick = (cellIndex) => {
    if (isSameCell(cellIndex)) {
      return;
    }
    openCell(cellIndex);
    game.current.clickCells.push(cellIndex);
    if (game.current.clickCells.length === 2) {
      setLoading(true);
      const [firstCellIndex, secondCellIndex] = game.current.clickCells;
      if (isCellEqual(firstCellIndex, secondCellIndex)) {
        game.current.results.score++;
        setTimeout(() => {
          hideCell([firstCellIndex, secondCellIndex])
          setLoading(false);
        }, 500)
        if (checkIsWin()) {
          endGame(game.current.results);
        }
      } else {
        game.current.results.fails++;
        setTimeout(() => {
          closeCell([firstCellIndex, firstCellIndex]);
          setLoading(false);
        }, 500)
      }
      resetClickCells();
    }
  }

  const updateTime = (seconds) => {
    game.current.results.time = seconds;
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="game-board"> 
        <div className="d-flex justify-content-center">
          <Timer updateTime={updateTime}/>
        </div>
        <div className="d-flex justify-content-center">
          <div className="d-grid board-border"
               style={{gridTemplateColumns: `repeat(${size},1fr)`, gridTemplateRows: `repeat(${size},1fr)`, gap: "5px"}}>
            {cells && cells.map((element, index) =>
              <Tableau key={index} index={index} data={element} onClick={handleClick} loading={loading}
                         boardSize={size}/>)
            }
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="menu-btn mt-2" onClick={goToMenu}>menu</button>
        </div>
      </div>
    </div>
  );
};

export default Partie;


