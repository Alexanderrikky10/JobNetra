import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavLayout from "../components/Layouts/NavLayout";

const Tutorial = () => {
  return (
    <NavLayout>
      <div className="flex flex-col px-5 md:px-20 pt-12">
        {/* Header */}
        <section className="max-w-2xl mx-auto flex flex-col gap-6 items-center">
          <h2 className="text-3xl font-bold text-center">
            Getting Started with{" "}
            <span className="text-[var(--primary-color)]">JobNetra</span>
          </h2>
          <p className="text-lg text-center">
            Learn how to make the most of JobNetra&apos;s AI powered features to
            find your dream job quickly and efficiently.
          </p>
        </section>

        {/* Tutorials */}
        <section className="bg-white w-full flex flex-col items-center p-10 mt-10 gap-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Step-by-Step Guide</h2>

          {/* Step 1 */}
          <section className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-5">
            <div className="bg-[var(--primary-color)] flex w-10 h-10 justify-center items-center md:self-start rounded-full shrink-0">
              <p className="text-white font-semibold">1</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-2xl md:text-start text-center">
                Create Your Profile
              </h3>
              <p className="text-center md:text-start">
                Start by creating your professional profile. Fill in your work
                experience, education, skills, and preferences. The more
                detailed your profile, the better our AI can match you with
                relevant opportunities.
              </p>
            </div>
          </section>

          {/* Step 2 */}
          <section className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-5">
            <div className="bg-[var(--secondary-color)] flex w-10 h-10 justify-center items-center md:self-start rounded-full shrink-0">
              <p className="text-white font-semibold">2</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-2xl md:text-start text-center">
                Set Your Preferences
              </h3>
              <p className="text-center md:text-start">
                Customize your job preferences including desired salary range,
                location, work type (remote/hybrid/onsite), and industry
                preferences. This helps our AI filter the most relevant
                opportunities for you.
              </p>
            </div>
          </section>

          {/* Step 3 */}
          <section className="flex flex-col md:flex-row items-center w-full gap-2 md:gap-5">
            <div className="bg-[var(--primary-color)] flex w-10 h-10 justify-center items-center md:self-start rounded-full shrink-0">
              <p className="text-white font-semibold">3</p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-2xl md:text-start text-center">
                Apply and Track
              </h3>
              <p className="text-center md:text-start">
                Once you find interesting opportunities, apply directly through
                our platform. Track your application status, receive
                notifications, and manage your job search journey effectively.
              </p>
            </div>
          </section>
        </section>

        {/* Frequently Asked Questions */}

        <section className="max-w-3xl mx-auto flex flex-col items-center mt-12 mb-8 gap-8">
          <h2 className="text-3xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">
                  <p className="font-bold">
                    How does JobNetra&apos;s AI matching work?
                  </p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                Our AI analyzes your profile, skills, and preferences to match
                you with the most relevant job opportunities. It considers
                factors like experience level, required skills, and company
                culture fit.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">
                  <p className="font-bold">Is JobNetra free to use?</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                Yes, JobNetra is free for job seekers. Create your profile,
                apply to jobs, and access basic features at no cost. Premium
                features are available for enhanced job search capabilities.
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">
                  <p className="font-bold">
                    Can I get notifications for new job matches?
                  </p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                Yes, you can set up job alerts based on your preferences.
                Receive notifications via email or mobile app when new matching
                opportunities are posted.
              </AccordionDetails>
            </Accordion>
          </div>
        </section>
      </div>
    </NavLayout>
  );
};

export default Tutorial;
