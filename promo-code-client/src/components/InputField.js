import React from "react";

const InputField = ({ type, value, onChange, placeholder, label = null }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (type === "number" && inputValue !== "") {
      onChange(Number(inputValue));
    } else {
      onChange(inputValue);
    }
  };

  return (
    <div className="input-field-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export default InputField;