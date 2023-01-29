import React from "react";
import "./FancyInput.scss";

function FancyInput({ type, placeholder, onChange, ...props }) {
  return (
    <input
      className="FancyInput"
      type={type}
      {...props}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default FancyInput;
