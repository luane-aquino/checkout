import React from 'react';
import './Bag.css';

function Bag() {
  const handleClick = () => {
    // chama a rota payment
  }

  return (
    <div className="Bag">
      <h1>bag!</h1>
      {/* produtos */}
      {/* prices */}
      <button onClick={handleClick}></button>
    </div>
  );
}

export default Bag;
