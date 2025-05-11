import React, { useState } from "react";
import Label from "../GeneralInput/Label";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = (props) => {
  const { name, placeholder, children, classGeneral, classLabel, classInput } =
    props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className={classGeneral}>
      <Label className={classLabel} name={name}>
        {children}
      </Label>
      <div className="relative">
        <input
          className={classInput}
          type={isPasswordVisible ? "text" : "password"}
          name={name}
          id={name}
          placeholder={placeholder}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <span>
            {isPasswordVisible ? (
              <FaEyeSlash className=" text-[var(--text-secondary)] hover:text-gray-700 cursor-pointer" />
            ) : (
              <FaEye className=" text-[var(--text-secondary)] hover:text-gray-700 cursor-pointer" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
