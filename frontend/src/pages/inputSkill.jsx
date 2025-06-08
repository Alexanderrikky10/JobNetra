import { useEffect, useState } from "react";
import SelectInput from "../components/Elements/SelectInput/SelectInput";
import NavLayout from "../components/Layouts/NavLayout";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import loadingPhrases from "../services/loadingPhrases.json";

const components = {
  DropdownIndicator: null,
};

const createSkill = (label) => ({
  label,
  value: label,
});

const InputSkill = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoadingAuthentication } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectErrorText, setSelectErrorText] = useState("");
  const [multiErrorText, setMultiErrorText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [phrase, setPhrase] = useState("");
  const loadingScreenTime = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * loadingPhrases.length);
    setPhrase(loadingPhrases[randomIndex]);
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isLoadingAuthentication) {
      navigate("/login");
      return;
    }
  }, [navigate, isAuthenticated, isLoadingAuthentication]);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (skills.some((skill) => skill.value === inputValue)) {
          setInputValue("");
          event.preventDefault();
          return;
        }

        // Validasi ga boleh lebih dari 9
        if (skills.length === 8) {
          setMultiErrorText("You can only add a maximum of 8 skills.");
          setInputValue("");
          event.preventDefault();
          return;
        }

        setSkills((prev) => [...prev, createSkill(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid && selectedLocation) {
      setIsPending(true);
      try {
        //Siapin data buat dikirim ke backend dengan mengubahnya menjadi string
        const labelSkills = skills.map((skill) => skill.value);
        const stringedSkills = labelSkills.join(",");

        //Lokasi juga disiapin
        const location = selectedLocation.value;

        //Axios
        const jobResult = await api
          .post("/predict", { input_skills: stringedSkills })
          .then((response) => response.data.data.top_predictions)
          .catch((error) => console.error(error));

        const jobResultArray = jobResult.map((job) => job.label);
        const jobResultString = jobResultArray.join(", ");

        console.log(jobResultString);

        const queryParams = new URLSearchParams();
        if (jobResult) queryParams.set("keywords", jobResultString);
        if (location) queryParams.set("location", location);
        queryParams.set("page", 1);

        console.log("queryParams: " + queryParams);

        await loadingScreenTime(1000);
        navigate(`/jobs?${queryParams.toString()}`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsPending(false);
      }
    }
  };

  const handleChange = (newValue) => setSkills(newValue);

  const handleReset = () => {
    setSkills([]);
    setInputValue("");
    setMultiErrorText("");
    setSelectErrorText("");
    setSelectedLocation(null);
  };

  const handleOnInputChange = (newValue) => {
    if (!newValue.includes(",")) {
      setInputValue(newValue);
      if (multiErrorText != "") {
        setMultiErrorText("");
      }
    } else {
      setMultiErrorText("The skills can't contain a comma.");
    }
  };

  const handleChangeLocation = (selectedOption) => {
    setSelectedLocation(selectedOption);
    setSelectErrorText("");
  };

  const validateForm = () => {
    //Clear error
    setMultiErrorText("");
    setSelectErrorText("");

    let isValid = true;
    //Validasi skill
    if (skills.length < 4) {
      setMultiErrorText("You must add a minimum 4 skills.");
      isValid = false;
    }

    //Validasi lokasi
    if (selectedLocation === null) {
      setSelectErrorText("Pick a location first.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <NavLayout>
      {!isPending ? (
        <div className="max-h-dvh">
          <section className="flex flex-col items-center justify-center mt-4 text-center">
            <h1 className="text-3xl font-bold">Tell us about your skills</h1>
            <p className="max-w-md">
              Select skills and your preferred location to get personalized job
              recommendations
            </p>
          </section>

          <div className="flex justify-center ">
            <form
              className="bg-white border-1 border-gray-400 m-8 lg:w-1/2 p-6 rounded-md"
              onSubmit={handleSubmit}
            >
              <div className="mb-6">
                <label className="block font-semibold after:content-['*'] after:text-red-500">
                  Select your skills{" "}
                </label>
                <p className="text-gray-500 mb-2 text-sm">
                  Enter between 4 to 8 skills. Press Enter or Tab to add a
                  skill.
                </p>
                <SelectInput
                  isMulti={true}
                  components={components}
                  inputValue={inputValue}
                  handleChange={handleChange}
                  handleInputChange={(newValue) =>
                    handleOnInputChange(newValue)
                  }
                  handleKeyDown={handleKeyDown}
                  value={skills}
                  error={multiErrorText !== ""}
                />
                {multiErrorText != "" && (
                  <p className="text-red-500 mt-2">{multiErrorText}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-semibold after:content-['*'] after:text-red-500">
                  Preferred Location{" "}
                </label>
                <SelectInput
                  handleChange={handleChangeLocation}
                  isMulti={false}
                  error={selectErrorText !== ""}
                  value={selectedLocation}
                />
                {selectErrorText != "" && (
                  <p className="text-red-500 mt-2">{selectErrorText}</p>
                )}
              </div>
              <div className="flex gap-2 md:flex-row flex-col">
                <button
                  className="bg-[var(--primary-color)] grow-2 py-2 rounded-md hover:bg-[var(--primary-hover)] cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  <p className="text-white font-semibold" type="submit">
                    {isPending ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Find Matching Jobs"
                    )}
                  </p>
                </button>
                <button
                  className="border-1 px-4 rounded-md font-semibold py-2 cursor-pointer hover:bg-gray-200"
                  onClick={handleReset}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center flex-col gap-10">
          <div className="loader mx-auto my-10"></div>
          <h1 className="text-3xl text-[var(--primary-color)] font-bold text-center">
            {phrase}
          </h1>
        </div>
      )}
    </NavLayout>
  );
};

export default InputSkill;
