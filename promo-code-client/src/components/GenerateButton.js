import React from "react";

const GenerateButton = ({ isActive, onGenerate }) => {
  return (
    <button className="generate-button" onClick={onGenerate} disabled={!isActive}>
      Generate Promo Codes
    </button>
  );
};

export default GenerateButton;
