import React, { useState } from "react";
import NavLayout from "../components/Layouts/NavLayout";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { locationOptions } from "../services/city";

const customStyles = {
  control: (base, state) => ({
    ...base,
    height: "48px", // Sama dengan h-12 Tailwind
    minHeight: "48px",
    borderRadius: "0.375rem", // rounded-md
    borderColor: state.isFocused ? "#000000" : "#e5e7eb", // hover:border-black dan border-gray-200
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      borderColor: "#000000",
    },
    paddingLeft: "0.5rem", // px-2
    paddingRight: "0.5rem",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    height: "48px",
    display: "flex",
    alignItems: "center",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "48px",
  }),
};

const JobPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };
  return (
    <NavLayout>
      <section className="flex gap-20 pt-12 items-center">
        <div className="flex-auto flex flex-col justify-center">
          <h2 className="text-5xl font-bold">
            Find Your Dream Job With{" "}
            <span className="text-[var(--primary-color)]">JobNetra</span>
          </h2>
          <p className="text-lg mt-10">
            AI-powered job matching platform that connects you with the perfect
            opportunities tailored to your skills and preferences.
          </p>
          <form className="mt-5 flex gap-2 w-full">
            <div className="flex-[7] flex flex-col gap-2">
              <input
                className="bg-white py-2 px-2 rounded-md shadow-md border border-[var(--bg-light)] hover:border-black"
                type="text"
                name="keywords"
                id="keywords"
                placeholder="Search jobs, companies, or keywords"
              />
              <div className="">
                <Select
                  id="location"
                  name="location"
                  options={locationOptions}
                  onChange={handleChange}
                  placeholder="Select location"
                  isSearchable
                  styles={customStyles}
                />
              </div>
            </div>

            <button
              className="shadow-md flex-[1] cursor-pointer bg-[var(--primary-color)] text-white px-2 rounded-lg hover:bg-[var(--primary-hover)] flex items-center justify-center"
              type="submit"
            >
              <FaSearch />
            </button>
          </form>
          <div className="mt-7 flex gap-1 w-full">
            <button
              className="flex-auto py-2 px-4 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-hover)]"
              type="button"
            >
              Get Started
            </button>
            <button
              className="flex-auto py-2 px-4 bg-white text-[var(--primary-color)] border border-[var(--primary-color)] font-semibold rounded-lg hover:bg-[var(--primary-color)] hover:text-white"
              type="button"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-auto hidden md:block">
          <img
            className="w-full rounded-2xl"
            src="/images/hero-job.png"
            alt=""
          />
        </div>
      </section>
    </NavLayout>
  );
};

export default JobPage;
