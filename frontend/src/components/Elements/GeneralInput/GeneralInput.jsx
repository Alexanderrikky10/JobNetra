import React from "react";
import Label from "./Label";
import Input from "./Input";

const GeneralInput = (props) => {
  const {
    type,
    name,
    placeholder,
    children,
    classGeneral,
    classLabel,
    classInput,
  } = props;
  return (
    <div className={classGeneral}>
      <Label name={name} className={classLabel}>
        {children}
      </Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        className={classInput}
      />
    </div>
  );
};

export default GeneralInput;
