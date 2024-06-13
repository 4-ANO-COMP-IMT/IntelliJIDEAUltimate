
import React from 'react';

const ButtonsPage = () => {
  const handleButtonClick = (buttonNumber) => {
    alert(`Button ${buttonNumber} clicked!`);
  };

  return (
    <div className="buttons-page-container">
      <h2>Buttons Page</h2>
      <img
        src={`https://source.unsplash.com/random/800x600`}
        alt="Random"
        style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
      />
      <div className="buttons-container">
        {Array.from({ length: 5 }, (_, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index + 1)}
            style={{ margin: '10px' }}
          >
            Button {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonsPage;
