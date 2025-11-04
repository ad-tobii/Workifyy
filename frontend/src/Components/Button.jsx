import React from "react";

const Button = ({ name, className = "" }) => {
  return (
    <div>
      <button className={className}>{name}</button>
    </div>
  );
};

export default Button;
