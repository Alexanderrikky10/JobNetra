import Select from "react-select";
import { locationOptions } from "../../../services/city";
import CreatableSelect from "react-select/creatable";

const SelectInput = ({
  handleChange,
  selectedLocation,
  isMulti,
  components = "",
  inputValue = "",
  error = "",
  handleInputChange = () => {},
  handleKeyDown = () => {},
  value = "",
  ref,
}) => {
  const customStyles = (hasError) => ({
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      padding: 0,
      borderRadius: "0.375rem", // rounded-md
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: hasError
        ? "#ef4444" // Tailwind red-500
        : state.isFocused
        ? "var(--secondary-color)"
        : "var(--bg-light)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)", // shadow-md
      "&:hover": {
        borderColor: hasError ? "#ef4444" : "var(--secondary-color)",
      },
      fontSize: "0.875rem", // text-sm
    }),
    // ... keep the rest unchanged
    valueContainer: (base) => ({
      ...base,
      padding: "0.5rem",
      fontSize: "0.875rem",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
      fontSize: "0.875rem",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      paddingRight: "0.5rem",
      height: "auto",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 0,
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "0.875rem",
      color: "#9ca3af",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
    menu: (base) => ({
      ...base,
      fontSize: "0.875rem",
    }),
  });

  return (
    (!isMulti && (
      <Select
        id="location"
        name="location"
        options={locationOptions}
        onChange={handleChange}
        placeholder="Select location"
        isSearchable
        styles={customStyles(error && !selectedLocation?.value)}
        value={value}
      />
    )) ||
    (isMulti && (
      <CreatableSelect
        id="skills"
        name="skills"
        placeholder="Type a skill and press Enter..."
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        styles={customStyles(error && value.length < 4)}
        value={value}
        ref={ref}
      />
    ))
  );
};

export default SelectInput;
