import React from "react";

const GenerateButton = ({ onGenerate }) => {
  return (
    <button className="generate-button" onClick={onGenerate}>
      Generate Promo Codes
    </button>
  );
};

export default GenerateButton;
