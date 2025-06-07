import { Link } from "react-router-dom";

const EmailSuccess = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <div className="">
        <img
          src="images/mail-sent.svg"
          alt="success"
          className="h-80 object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-[var(--primary-color)]">
        Email Sent
      </h1>
      <p className="text-lg font-semibold">
        Check your email to reset your password.
      </p>
      <Link
        to="/login"
        className="bg-[var(--secondary-color)] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[var(--secondary-hover)]"
      >
        Back to Login
      </Link>
    </div>
  );
};

export default EmailSuccess;
