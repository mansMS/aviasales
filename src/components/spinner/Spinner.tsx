import React from 'react';
import './Spinner.scss';

const Spinner: React.FC = () => {
  return (
    <div className="SpinnerBlock">
      <div className="Spinner">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
    </div>
  )
}

export default Spinner;