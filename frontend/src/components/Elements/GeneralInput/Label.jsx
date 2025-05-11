import React from "react";

const Label = (props) => {
  const { name, children, className } = props;
  return (
    <label htmlFor={name} className={className}>
      {children}
    </label>
  );
};

export default Label;
