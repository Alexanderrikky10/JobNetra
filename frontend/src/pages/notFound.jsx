import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg font-semibold">Page Not Found</p>
        <Link
          to="/"
          className="bg-[var(--primary-color)] text-white py-2 px-4 rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
