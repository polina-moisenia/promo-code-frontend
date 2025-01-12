import React from "react";

const InputField = ({ type, value, onChange, placeholder, label = null }) => {
  return (
    <div className="input-field-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export default InputField;
