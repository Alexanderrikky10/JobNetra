import { useEffect, useRef, useState } from "react";
import NavLayout from "../components/Layouts/NavLayout";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import JobCard from "../components/Fragments/JobCard";
import { getJobs } from "../services/product";
import Pagination from "../components/Fragments/Pagination";
import { useAuth } from "../hooks/useAuth";
import { useRouterReady } from "../hooks/useQueryReady";

const DetailJobPage = () => {
  const navigate = useNavigate();
  const isReady = useRouterReady();
  const { isAuthenticated, isLoadingAuthentication } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [totalJob, setTotalJob] = useState(0);
  const [currentPage, setCurrentPage] = useState("1");

  console.log(isAuthenticated, isLoadingAuthentication);

  const selectComponent = useRef(null);

  useEffect(() => {
    async function fetchData(keywords, location, page, salary) {
      setIsLoading(true);
      setIsError("");
      setTotalJob(0);
      try {
        const response = await getJobs(keywords, location, page, salary);

        if (!response.jobs || response.jobs.length === 0) {
          throw new Error("Data not found");
        }

        setData(response.jobs);
        setTotalJob(response.totalCount);
      } catch (error) {
        setIsError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    if (!isReady) {
      return;
    }

    // Handle authentication
    if (!isAuthenticated && !isLoadingAuthentication) {
      navigate("/login");
      return;
    }

    const keywords = searchParams.get("keywords");
    const location = searchParams.get("location");
    const page = searchParams.get("page");
    const salary = searchParams.get("salary");

    // Validate required parameters
    if (!keywords?.trim() || !location?.trim() || !page?.trim()) {
      navigate("/");
      return;
    }

    // All checks passed, proceed with data fetching
    setCurrentPage(page);

    if (salary && selectComponent.current) {
      selectComponent.current.value = salary;
    }
    fetchData(keywords, location, page, salary);
  }, [
    navigate,
    searchParams,
    isReady,
    isAuthenticated,
    isLoadingAuthentication,
  ]);

  // useEffect(() => {
  //   try {
  //     setIsLoading(true);
  //     const data = dummyData["jobs"];
  //     if (data.length > 0) {
  //       setData(data);
  //     } else {
  //       throw new Error("Data not found");
  //     }
  //   } catch (error) {
  //     setIsError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const handleAddSalary = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("salary", e.target.value);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return (
    <NavLayout>
      <section className="min-h-11/12 px-10 md:px-20 pt-10 flex flex-col items-center justify-between">
        <div className="w-full flex flex-col">
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

          <div className="mt-14 bg-white w-full py-5 px-6 rounded-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <label className="font-semibold" htmlFor="salary">
                Min Salary:
              </label>
              <select
                className="border-2 hover:border-[var(--primary-color)] rounded-lg py-1 px-2 cursor-pointer"
                name="salary"
                id="salary"
                defaultValue={""}
                onChange={handleAddSalary}
                ref={selectComponent}
              >
                <option disabled value={""}>
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
            <div>
              <p>Total Jobs: {totalJob}</p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-4 items-center w-full">
            {!isLoading &&
              !isError &&
              data.map((item) => (
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
            {isLoading && <p>Loading...</p>}
            {isError && <p>{isError}</p>}
          </div>
        </div>
        {totalJob >= 11 && (
          <Pagination totalJob={totalJob} currentPage={currentPage} />
        )}
      </section>
    </NavLayout>
  );
};

export default DetailJobPage;
