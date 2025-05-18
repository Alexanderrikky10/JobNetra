import React from "react";
import { FaArrowRight, FaBuilding, FaClock, FaMoneyBill } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";

const JobCard = ({ title, location, salary, type, link, company }) => {
  return (
    <div className="shadow-md shadow-black/20 w-full bg-white py-5 px-7 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-[var(--bg-light)] rounded-lg">
            <FaBuilding className="text-2xl text-[var(--primary-color)]" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl">{title}</h2>
            <p className="text-[var(--text-secondary)]">{company}</p>
          </div>
        </div>
        <a
          className="cursor-pointer p-2 hover:bg-gray-300 rounded-full"
          href={link}
          target="_blank"
        >
          <FaArrowRight className="text-[var(--primary-color)] hover:text-[var(--primary-hover)]" />
        </a>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="flex gap-1 items-center">
          <FaLocationPin className="text-red-800" />
          <p className="text-[var(--text-secondary)]">{location}</p>
        </div>
        <div className="flex gap-2 items-center">
          <FaMoneyBill className="text-[var(--secondary-color)]" />
          <p className="text-[var(--text-secondary)]">
            {salary ? salary : "-"}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <FaClock className="text-[var(--primary-color)]" />
          <p className="text-[var(--text-secondary)]">{type ? type : "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
