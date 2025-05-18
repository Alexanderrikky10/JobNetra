import React, { useState } from "react";
import NavLayout from "../components/Layouts/NavLayout";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import { locationOptions } from "../services/city";
import { FaPaperPlane, FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "white",
    padding: 0,
    borderRadius: "0.375rem", // rounded-md
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: state.isFocused ? "var(--secondary-color)" : "var(--bg-light)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)", // shadow-md shadow-black/20
    "&:hover": {
      borderColor: "var(--secondary-color)",
    },
    fontSize: "0.875rem", // text-sm
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0.5rem", // py-2 px-2
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
    paddingRight: "0.5rem", // aligns with px-2
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
    color: "#9ca3af", // text-gray-400
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: "0.875rem",
  }),
  menu: (base) => ({
    ...base,
    fontSize: "0.875rem",
  }),
};

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };
  return (
    <NavLayout>
      <section className="flex gap-20 pt-12 items-center px-20">
        <div className="flex-auto flex flex-col justify-center">
          <h2 className="text-5xl font-bold">
            Find Your Dream Job With{" "}
            <span className="text-[var(--primary-color)]">JobNetra</span>
          </h2>
          <p className="text-lg mt-10">
            AI-powered job matching platform that connects you with the perfect
            opportunities tailored to your skills and preferences.
          </p>

          <div className="mt-7 flex gap-1 w-full">
            <button
              className="shadow-sm shadow-black/20 flex-auto py-2 px-4 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-hover)]"
              type="button"
            >
              Try our powerful Machine Learning
            </button>
            <button
              className="shadow-sm shadow-black/20 flex-auto py-2 px-4 bg-white text-[var(--primary-color)] border border-[var(--primary-color)] font-semibold rounded-lg hover:bg-[var(--primary-color)] hover:text-white"
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

      <section className="mt-32 grid grid-cols-2 shadow-sm shadow-black/20 sm:flex gap-y-12 sm:gap-0 px-20 sm:justify-evenly bg-white py-12 w-full">
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[var(--primary-color)] text-3xl font-bold">2M+</p>
          <p className="text-lg">Active Users</p>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[var(--primary-color)] text-3xl font-bold">
            100K+
          </p>
          <p className="text-lg">Companies</p>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[var(--primary-color)] text-3xl font-bold">
            500K+
          </p>
          <p className="text-lg">Jobs Posted</p>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-[var(--primary-color)] text-3xl font-bold">95%</p>
          <p className="text-lg">Success Rate</p>
        </div>
      </section>

      <section className="mt-20 py-8 shadow-black/20 shadow-md px-7 sm:px-16 rounded-4xl flex flex-col items-center bg-[var(--primary-color)] w-10/12 mx-auto">
        <h2 className="text-4xl font-bold text-white">Job Search</h2>
        <p className="mt-4 text-lg text-white text-center">
          Discover opportunities from top companies
        </p>
        <form className="mt-10 flex flex-col sm:flex-row gap-2 w-full">
          <div className="flex-[7] flex flex-col gap-2">
            <input
              className="bg-white py-2 px-2 rounded-md shadow-md shadow-black/20 border-2 border-[var(--bg-light)] hover:border-[var(--secondary-color)] "
              type="text"
              name="keywords"
              id="keywords"
              placeholder="Search jobs, companies, or keywords"
            />
            <div>
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
            className="shadow-black/20 shadow-md flex-[1] py-5 sm:py-0 cursor-pointer bg-[var(--secondary-color)] text-white px-2 rounded-lg hover:bg-[var(--secondary-hover)] flex items-center justify-center"
            type="submit"
          >
            <FaSearch />
          </button>
        </form>
      </section>

      <section className="px-20 shadow-md shadow-black/20 mt-20 flex flex-col items-center bg-white py-10">
        <h2 className="text-4xl font-bold text-center">How JobNetra Works</h2>
        <p className="text-lg text-[var(--text-secondary)] mt-4 text-center">
          Simple steps to find your next opportunity
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-7 py-5">
          <div className="flex flex-col gap-2 items-center">
            <div className=" bg-[var(--primary-color)] rounded-full p-4">
              <FaUserPlus className="text-4xl text-white" />
            </div>
            <p className="text-center text-lg font-semibold">Create Profile</p>
            <p className="text-center">
              Sign up and complete your profile with your skills and preferences
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className=" bg-[var(--secondary-color)] rounded-full p-4">
              <FaSearch className="text-4xl text-white" />
            </div>
            <p className="text-center text-lg font-semibold">AI Matching</p>
            <p className="text-center">
              Our AI matches you with the most relevant job opportunities
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className=" bg-[var(--primary-color)] rounded-full p-4">
              <FaPaperPlane className="text-4xl text-white" />
            </div>
            <p className="text-center text-lg font-semibold">Apply & Connect</p>
            <p className="text-center">
              Apply to jobs and connect directly with employers
            </p>
          </div>
        </div>
      </section>

      <section className="shadow-md shadow-black/20 flex flex-col items-center bg-[var(--primary-color)] py-20 px-20">
        <h2 className="text-4xl font-bold text-white text-center">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-[var(--text-white-secondary)] text-center mt-4">
          Join thousands of professionals who found their dream jobs through
          JobNetra
        </p>
        <Link
          to="/"
          className="mt-5 py-3 px-7 rounded-full bg-[var(--secondary-color)] text-white hover:bg-[var(--secondary-hover)]"
        >
          Get Started Now
        </Link>
      </section>
    </NavLayout>
  );
};

export default HomePage;
