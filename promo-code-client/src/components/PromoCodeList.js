import React from "react";

const PromoCodeList = ({ promoCodes }) => {
  return (
    <div>
      <h3>Generated Promo Codes</h3>
      <ul className="promo-code-list">
        {promoCodes.map((code, index) => (
          <li key={index}>{code}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromoCodeList;
