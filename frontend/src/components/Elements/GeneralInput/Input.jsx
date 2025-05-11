import React from "react";

const Input = (props) => {
  const { type, name, placeholder, className } = props;
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
