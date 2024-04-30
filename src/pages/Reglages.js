import React, {useState} from 'react';

const Reglages = ({gameOptions: {value, set}, goBack}) => {
  const [rangeValue, setRangeValue] = useState(value.size);

  const goBackWithSaveOptions = () => {
    set({size: rangeValue});
    goBack()
  }

  return (
    <div className="d-flex justify-content-center flex-column">
      <div className="range">
        <p>taille : {rangeValue}x{rangeValue}</p>
        <input type="range" min="2" max="6" step="2" value={rangeValue} onChange={({ target: { value: radius } }) => setRangeValue(radius)}/>
      </div>
      <button className="menu-btn mt-2" onClick={goBackWithSaveOptions}>valider</button>
    </div>
  );
};

export default Reglages;