import NavLayout from "../components/Layouts/NavLayout";
import { FaClock, FaRobot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { SiTarget } from "react-icons/si";
import TeamCard from "../components/Fragments/TeamCard";

const AboutPage = () => {
  return (
    <NavLayout>
      <section className="flex gap-20 pt-12 items-center px-10 md:px-20">
        <div className="flex-1/2 flex flex-col justify-center">
          <h2 className="text-5xl font-bold">About JobNetra</h2>
          <p className="text-lg mt-10">
            JobNetra is an AI-powered job matching platform that connects
            talented professionals with their dream opportunities. We leverage
            cutting-edge technology to make job hunting smarter, faster, and
            more efficient.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-1 w-full">
            <Link
              className="text-center cursor-pointer shadow-sm shadow-black/20 flex-auto py-2 px-4 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-hover)]"
              to="/tutorial"
            >
              Learn More
            </Link>
            <button
              className="cursor-pointer shadow-sm shadow-black/20 flex-auto py-2 px-4 bg-white text-[var(--primary-color)] border border-[var(--primary-color)] font-semibold rounded-lg hover:bg-[var(--primary-color)] hover:text-white"
              type="button"
            >
              Contact Us
            </button>
          </div>
        </div>
        <div className="flex-1/2 hidden md:block">
          <img
            className="w-full rounded-2xl"
            src="/images/hero-about.png"
            alt=""
          />
        </div>
      </section>

      <section className="px-10 md:px-20 shadow-md shadow-black/20 mt-20 bg-white py-10 rounded-2xl flex justify-center">
        <div className="max-w-5xl flex flex-col items-center ">
          <h2 className="text-4xl font-bold text-center">Our Mission</h2>
          <p className="text-xl text-[var(--text-secondary)] mt-6 text-center">
            To revolutionize the job search experience by leveraging AI
            technology, making it easier for professionals to find roles that
            truly match their skills and aspirations.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-7 py-5">
            <div className="flex flex-col gap-2 items-center bg-[var(--bg-light)] p-10 rounded-3xl">
              <div className=" bg-[var(--primary-color)] rounded-lg p-4">
                <FaRobot className="text-4xl text-white" />
              </div>
              <p className="text-center text-lg font-semibold">
                AI-Powered Matching
              </p>
              <p className="text-center">
                Smart algorithms that understand your skills and match you with
                the perfect opportunities.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center bg-[var(--bg-light)] p-10 rounded-3xl">
              <div className=" bg-[var(--secondary-color)] rounded-lg p-4">
                <FaClock className="text-4xl text-white" />
              </div>
              <p className="text-center text-lg font-semibold">
                Time Efficiency
              </p>
              <p className="text-center">
                Reduce job search time with personalized recommendations and
                quick applications.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center bg-[var(--bg-light)] p-10 rounded-3xl">
              <div className=" bg-[var(--primary-color)] rounded-lg p-4">
                <SiTarget className="text-4xl text-white" />
              </div>
              <p className="text-center text-lg font-semibold">
                Precision Matching
              </p>
              <p className="text-center">
                Find jobs that align perfectly with your skills, experience, and
                career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-10 md:px-20 mt-20 py-10 rounded-2xl flex justify-center">
        <div className="max-w-5xl flex flex-col items-center ">
          <h2 className="text-4xl font-bold text-center">Meet Our Team</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 py-5">
            <TeamCard
              name="Alexander Rikky"
              image="/images/team/rikky.jpg"
              role="Team Leader"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eligendi?"
            />
            <TeamCard
              name="Laurensius Nathan"
              image="/images/team/nathan.jpeg"
              role="Front-end and Back-end Developer"
              description="Frontend web developer specialized in modern UI, UX, and interactive web apps."
            />
            <TeamCard
              name="Kevin Chaily"
              image="/images/team/KevinC.jpg"
              role="Front-end and Back-end Developer"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eligendi?"
            />

            <TeamCard
              name="Andreas Kevin"
              image="/images/team/avatar.png"
              role="Machine Learning Engineer"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eligendi?"
            />

            <TeamCard
              name="Robert Varian"
              image="/images/team/avatar.png"
              role="Machine Learning Engineer"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eligendi?"
            />

            <TeamCard
              name="Taufik Alwan"
              image="/images/team/avatar.png"
              role="Machine Learning Engineer"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eligendi?"
            />
          </div>
        </div>
      </section>

      <section className="mt-20 flex flex-col items-center justify-center gap-6 shadow-sm shadow-black/20 px-10 md:px-20 min-h-96 bg-white py-12 w-full">
        <h2 className="text-4xl font-bold text-center">Get in Touch</h2>
        <p className="text-xl text-[var(--text-secondary)] mt-6 text-center">
          Have questions about JobNetra? We{`'`}d love to hear from you.
        </p>
        <Link className="mt-5 py-3 px-7 rounded-2xl bg-[var(--primary-color)] text-white text-lg font-semibold hover:bg-[var(--primary-hover)]">
          Contact us
        </Link>
      </section>
    </NavLayout>
  );
};

export default AboutPage;
