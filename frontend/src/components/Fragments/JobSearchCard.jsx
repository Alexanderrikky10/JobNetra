import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { locationOptions } from "../../services/city";
import { FaSearch } from "react-icons/fa";

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

const JobSearchCard = () => {
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState({});
  const [keyword, setKeyword] = useState("");
  const [formError, setFormError] = useState(false);

  const handleChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!keyword.trim() || !selectedLocation?.value) {
      setFormError(true);
      return;
    }

    const location = selectedLocation.value;
    const keywords = keyword;

    const queryParams = new URLSearchParams();
    if (keywords) queryParams.set("keywords", keywords);
    if (location) queryParams.set("location", location);
    queryParams.set("page", 1);

    setKeyword("");
    setSelectedLocation({});
    setFormError(false);

    navigate(`/jobs?${queryParams.toString()}`);
  };
  return (
    <>
      <h2 className="text-4xl font-bold text-white">Job Search</h2>
      <p className="mt-4 text-lg text-white text-center">
        Discover opportunities from top companies
      </p>
      <form
        className="mt-10 flex flex-col sm:flex-row gap-2 w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex-[7] flex flex-col gap-2">
          <input
            className={`${
              formError && !keyword.trim()
                ? "border-red-500"
                : "border-[var(--bg-light)] hover:border-[var(--secondary-color)]"
            } bg-white py-2 px-2 rounded-md shadow-md shadow-black/20 border-2`}
            type="text"
            name="keywords"
            id="keywords"
            placeholder="Search jobs, companies, or keywords"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div>
            <Select
              id="location"
              name="location"
              options={locationOptions}
              onChange={handleChange}
              placeholder="Select location"
              isSearchable
              styles={customStyles(formError && !selectedLocation?.value)}
            />
          </div>
        </div>

        <button
          className="shadow-black/20 shadow-md flex-[1] py-5 sm:py-0 cursor-pointer bg-[var(--secondary-color)] text-white px-2 rounded-lg hover:bg-[var(--secondary-hover)] flex items-center justify-center"
          type="submit"
        >
          <FaSearch />
        </button>
      </form>
    </>
  );
};

export default JobSearchCard;
