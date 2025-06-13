import React, { useContext, useState } from "react";
import Label from "../GeneralInput/Label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { DarkMode } from "../../../context/DarkMode";

const PasswordInput = (props) => {
  const { isDarkMode } = useContext(DarkMode);
  const {
    name,
    placeholder,
    children,
    classGeneral,
    classLabel,
    classInput,
    field,
  } = props;
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
          {...(field && { ...field })}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <span>
            {isPasswordVisible ? (
              <FaEyeSlash
                className={` ${
                  isDarkMode ? "text-white" : "text-[var(--text-secondary)]"
                } hover:text-[var(--dark-hover)] cursor-pointer`}
              />
            ) : (
              <FaEye
                className={` ${
                  isDarkMode ? "text-white" : "text-[var(--text-secondary)]"
                } hover:text-[var(--dark-hover)] cursor-pointer`}
              />
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
