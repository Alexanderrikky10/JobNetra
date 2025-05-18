import React, { useEffect, useState } from "react";
import NavLayout from "../components/Layouts/NavLayout";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { dummyData } from "../services/dummy";
import JobCard from "../components/Fragments/JobCard";

const DetailJobPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    try {
      setIsLoading(true);
      const data = dummyData["jobs"];
      if (data.length > 0) {
        setData(data);
      } else {
        throw new Error("Data not found");
      }
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <NavLayout>
      <section className="min-h-screen px-10 md:px-20 pt-10 flex flex-col items-center">
        <div className="w-full flex justify-between">
          <h2 className="text-3xl font-semibold">Recommended Jobs</h2>
          <Link
            to="/"
            className="flex gap-2 items-center font-bold text-[var(--primary-color)] hover:text-[var(--primary-hover)]"
          >
            <FaArrowLeft />
            <p> Back to Search</p>
          </Link>
        </div>

        <div className="mt-14 bg-white w-full py-5 px-6 rounded-lg flex gap-2 items-center">
          <label className="font-semibold" htmlFor="salary">
            Min Salary:
          </label>
          <select
            className="border-2 hover:border-[var(--primary-color)] rounded-lg py-1 px-2 cursor-pointer"
            name="salary"
            id="salary"
          >
            <option disabled defaultValue={""}>
              Select min salary
            </option>
            <option value="1000000">1.000.000,00</option>
            <option value="2000000">2.000.000,00</option>
            <option value="3000000">3.000.000,00</option>
            <option value="4000000">4.000.000,00</option>
            <option value="5000000">5.000.000,00</option>
            <option value="6000000">6.000.000,00</option>
            <option value="7000000">7.000.000,00</option>
            <option value="8000000">8.000.000,00</option>
            <option value="9000000">9.000.000,00</option>
            <option value="10000000">10.000.000,00</option>
          </select>
        </div>

        <div className="mt-7 flex flex-col gap-4 items-center w-full">
          {data.map((item) => (
            <JobCard
              key={item.id}
              link={item.link}
              company={item.company}
              location={item.location}
              salary={item.salary}
              type={item.type}
              title={item.title}
            />
          ))}
        </div>
      </section>
    </NavLayout>
  );
};

export default DetailJobPage;
