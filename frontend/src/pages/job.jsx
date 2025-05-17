import React from "react";
import NavLayout from "../components/Layouts/NavLayout";
import { FaSearch } from "react-icons/fa";

const JobPage = () => {
  return (
    <NavLayout>
      <section className="flex gap-20 pt-12 items-center">
        <div className="flex-auto flex flex-col justify-center">
          <h2 className="text-5xl font-bold">
            Find Your Dream Job With <span className="text-[var(--primary-color)]">JobNetra</span>
          </h2>
          <p className="text-lg mt-10">
            AI-powered job matching platform that connects you with the perfect
            opportunities tailored to your skills and preferences.
          </p>
          <form className="mt-5 relative">
            <input className="block w-full bg-white py-2 px-2 rounded-md shadow-md border border-[var(--bg-light)] hover:border-black" type="text" name="search" id="search" placeholder="Search jobs, companies, or keywords"/>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-[var(--primary-color)] text-white p-2 rounded-lg hover:bg-[var(--primary-hover)]" type="submit">
              <FaSearch />
            </button>
          </form>
          <div className="mt-7 flex gap-1 w-full">
            <button className="flex-auto py-2 px-4 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-hover)]" type="button">Get Started</button>
            <button className="flex-auto py-2 px-4 bg-white text-[var(--primary-color)] border border-[var(--primary-color)] font-semibold rounded-lg hover:bg-[var(--primary-color)] hover:text-white" type="button">Learn More</button>
          </div>
        </div>
        <div className="flex-auto hidden md:block">
          <img className="w-full rounded-2xl" src="/images/hero-job.png" alt="" />
        </div>
      </section>
    </NavLayout>
  );
};

export default JobPage;
