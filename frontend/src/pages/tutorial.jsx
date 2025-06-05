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
    <>
      <NavLayout>
        {/* Header */}
        <section className="w-full flex flex-col items-center pt-8 pb-10 gap-2 px-12">
          <h2 className="text-3xl font-bold">
            Getting Started with{" "}
            <span className="text-[var(--primary-color)]">JobNetra</span>
          </h2>
          <p>
            Learn how to make the most of JobNetra&apos;s AI powered features to
            find your dream job quickly and efficiently.
          </p>
        </section>

        {/* Tutorials */}
        <section className="bg-white w-full flex flex-col items-center py-10 mb-8 gap-8 px-56">
          <h2 className="text-3xl font-bold">Step-by-Step Guide</h2>

          {/* Step 1 */}
          <section className="flex w-auto gap-6">
            <div className="bg-[var(--primary-color)] flex w-10 h-10 justify-center items-center self-start rounded-full shrink-0">
              <p className="text-white font-semibold">1</p>
            </div>
            <div>
              <h3 className="font-bold text-2xl">Create Your Profile</h3>
              <p>
                Start by creating your professional profile. Fill in your work
                experience, education, skills, and preferences. The more
                detailed your profile, the better our AI can match you with
                relevant opportunities.
              </p>
            </div>
          </section>

          {/* Step 2 */}
          <section className="flex w-auto gap-6">
            <div className="bg-[var(--secondary-color)] flex w-10 h-10 justify-center items-center self-start rounded-full shrink-0">
              <p className="text-white font-semibold">2</p>
            </div>
            <div>
              <h3 className="font-bold text-2xl">Set Your Preferences</h3>
              <p>
                Customize your job preferences including desired salary range,
                location, work type (remote/hybrid/onsite), and industry
                preferences. This helps our AI filter the most relevant
                opportunities for you.
              </p>
            </div>
          </section>

          {/* Step 3 */}
          <section className="flex w-auto gap-6">
            <div className="bg-[var(--primary-color)] flex w-10 h-10 justify-center items-center self-start rounded-full shrink-0">
              <p className="text-white font-semibold">3</p>
            </div>
            <div>
              <h3 className="font-bold text-2xl">Apply and Track</h3>
              <p>
                Once you find interesting opportunities, apply directly through
                our platform. Track your application status, receive
                notifications, and manage your job search journey effectively.
              </p>
            </div>
          </section>
        </section>

        {/* Frequently Asked Questions */}

        <section className="w-full flex flex-col items-center py-10 mb-8 gap-4 px-56">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
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
              Our AI analyzes your profile, skills, and preferences to match you
              with the most relevant job opportunities. It considers factors
              like experience level, required skills, and company culture fit.
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
              Yes, JobNetra is free for job seekers. Create your profile, apply
              to jobs, and access basic features at no cost. Premium features
              are available for enhanced job search capabilities.
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
              Yes, you can set up job alerts based on your preferences. Receive
              notifications via email or mobile app when new matching
              opportunities are posted.
            </AccordionDetails>
          </Accordion>
        </section>
      </NavLayout>
    </>
  );
};

export default Tutorial;
