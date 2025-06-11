import { GiSuitcase } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

const FooterLayout = () => {
  const location = useLocation();

  return (
    <>
      <div className="bg-[var(--bg-light)] ">
        <div className="flex flex-col items-center m-6 mb-2">
          <div className="md:flex md:flex-row md:justify-between w-full px-10 md:gap-20">
            <section className="flex flex-col items-center mb-4 md:flex-1/2 md:items-start">
              <div className="flex flex-col items-center md:items-start">
                <GiSuitcase className="text-3xl md:text-3xl xl:text-4xl text-[var(--primary-color)]" />
                <h1 className="text-xl text-[var(--primary-color)] font-bold">
                  JobNetra
                </h1>
              </div>
              <p className="text-center my-2 md:text-left">
                AI-powered job matching platform connecting talent with
                opportunities.
              </p>
            </section>
            <div className="flex flex-col md:flex-row md:gap-5 lg:justify-center flex-1/2">
              <section className="md:flex-1/2 md:items-end">
                <h2 className="text-lg text-[var(--primary-color)] font-bold text-center md:text-left">
                  Quick Links
                </h2>
                <div className="my-2 flex flex-col items-center gap-3 lg:text-md text-sm md:items-start">
                  <Link
                    to="/"
                    className={`${"text-[var(--text-nav)] hover:text-[var(--primary-hover)] hover:after:scale-x-100"} relative font-bold after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 origin-center`}
                  >
                    Home
                  </Link>

                  <Link
                    to="/skills"
                    className={`${
                      location.pathname === "/skills"
                        ? "text-[var(--primary-hover)] after:scale-x-100"
                        : "text-[var(--text-nav)] hover:text-[var(--primary-hover)] hover:after:scale-x-100"
                    } relative font-bold after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 origin-center`}
                  >
                    Skills
                  </Link>
                  {/* <Link
          to="/jobs"
          className="relative text-[var(--text-nav)] font-bold text-lg hover:text-[var(--primary-hover)] after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 hover:after:scale-x-100 origin-center"
        >
          Jobs
        </Link> */}
                  <Link
                    to="/tutorial"
                    className={`${
                      location.pathname === "/tutorial"
                        ? "text-[var(--primary-hover)] after:scale-x-100"
                        : "text-[var(--text-nav)] hover:text-[var(--primary-hover)] hover:after:scale-x-100"
                    } relative font-bold after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 origin-center`}
                  >
                    Tutorial
                  </Link>

                  <Link
                    to="/about"
                    className={`${
                      location.pathname === "/about"
                        ? "text-[var(--primary-hover)] after:scale-x-100"
                        : "text-[var(--text-nav)] hover:text-[var(--primary-hover)] hover:after:scale-x-100"
                    } relative font-bold after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[2px] after:bg-[var(--primary-hover)] after:transition-all after:duration-300 after:scale-x-0 origin-center`}
                  >
                    About
                  </Link>
                </div>
              </section>
              <section className="flex flex-col my-2 md:justify-start md:my-0 flex-1/2">
                <h2 className="text-lg text-[var(--primary-color)] font-bold text-center my-2 md:my-0">
                  Follow Us
                </h2>
                <div className="flex justify-center gap-4 md:my-2">
                  <img
                    src="/images/instagram.svg"
                    alt="Instagram"
                    className="w-6"
                  />
                  <img src="/images/x.svg" alt="Instagram" className="w-6" />
                  <img
                    src="/images/linkedin.svg"
                    alt="Instagram"
                    className="w-6"
                  />
                </div>
              </section>
            </div>
          </div>
          <section className="mt-4">
            <p className="text-sm font-bold">©Copyright JobNetra.com</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default FooterLayout;
