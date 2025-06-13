import { useEffect, useRef, useState } from "react";
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
  const [selectErrorHistoryText, setSelectErrorHistoryText] = useState("");
  const [multiErrorText, setMultiErrorText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [history, setHistory] = useState("");
  const [historyLocation, setHistoryLocation] = useState(null);
  const skillSelectRef = useRef(null);

  console.log(history);

  const loadingScreenTime = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * loadingPhrases.length);
    setPhrase(loadingPhrases[randomIndex]);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await api
        .get("/history")
        .then((response) => {
          const decoded = JSON.parse(response.data.data.result);
          const predictions = decoded.top_predictions.map((job) => job.label);
          return predictions.join(", ");
        })
        .catch((error) => console.error(error));
      return result;
    }

    fetchData().then((result) => {
      if (result !== undefined) {
        setHistory(result);
      }
    });
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !isLoadingAuthentication) {
      navigate("/login");
      return;
    }
  }, [navigate, isAuthenticated, isLoadingAuthentication]);

  const addSkill = () => {
    if (!inputValue) return;
    if (skills.some((skill) => skill.value === inputValue)) {
      setInputValue("");
      return;
    }

    if (skills.length === 8) {
      setMultiErrorText("You can only add a maximum of 8 skills.");
      setInputValue("");
      return;
    }

    setSkills((prev) => [...prev, createSkill(inputValue)]);
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      addSkill();
    }
  };

  const handleBlur = () => {
    addSkill();

    setTimeout(() => {
      if (skillSelectRef.current) {
        skillSelectRef.current.focus();
      }
    }, 0);
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

  const handleSubmitHistory = async (event) => {
    event.preventDefault();

    const isValid = validateFormHistory();

    if (isValid && historyLocation) {
      setIsPending(true);
      try {
        //Lokasi juga disiapin
        const location = historyLocation.value;

        const queryParams = new URLSearchParams();
        if (history) queryParams.set("keywords", history);
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

  const handleChangeLocationHistory = (selectedOption) => {
    setHistoryLocation(selectedOption);
    setSelectErrorHistoryText("");
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

  const validateFormHistory = () => {
    //Clear error
    setSelectErrorHistoryText("");

    let isValid = true;

    //Validasi lokasi
    if (historyLocation === null) {
      setSelectErrorHistoryText("Pick a location first.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <NavLayout>
      {!isPending ? (
        <div className="pt-10 px-5 md:px-10">
          <section className="flex flex-col items-center gap-4 justify-center text-center w-full max-w-xl mx-auto">
            <h1 className="text-3xl font-bold">Tell us about your skills</h1>
            <p className="w-full">
              Select skills and your preferred location to get personalized job
              recommendations by our AI.
            </p>
          </section>

          <section className="flex flex-col items-center justify-center gap-15 max-w-xl py-10 mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
              <form
                className="bg-white border-1 border-gray-400 w-full p-6 rounded-md"
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
                    ref={skillSelectRef}
                    isMulti={true}
                    components={components}
                    inputValue={inputValue}
                    handleChange={handleChange}
                    handleInputChange={(newValue) =>
                      handleOnInputChange(newValue)
                    }
                    handleKeyDown={handleKeyDown}
                    handleBlur={handleBlur}
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
                        "Predict Matching Jobs"
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
            {history !== "" && (
              <div className="flex flex-col items-center justify-center text-center w-full">
                <hr className="w-full mb-7 text-gray-400" />
                <h3 className="text-[var(--text-secondary)] text-3xl font-semibold mb-4">
                  History
                </h3>
                <div className="bg-white border-1 border-gray-400 mx-8 w-full p-6 rounded-md">
                  <form
                    onSubmit={handleSubmitHistory}
                    className="flex flex-col justify-center w-full items-start"
                  >
                    <h4 className="text-lg text-[var(--text-secondary)] text-start">
                      Your latest prediction:
                    </h4>
                    <p className="text-[var(--secondary-color)] text-start">
                      {history}
                    </p>
                    <div className="w-full text-start">
                      <label className="block mb-2 font-semibold after:content-['*'] after:text-red-500 mt-4">
                        Preferred Location{" "}
                      </label>
                      <SelectInput
                        handleChange={handleChangeLocationHistory}
                        isMulti={false}
                        error={selectErrorHistoryText !== ""}
                        value={historyLocation}
                      />
                      {selectErrorHistoryText != "" && (
                        <p className="text-red-500 mt-2">
                          {selectErrorHistoryText}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="mt-4 w-full bg-[var(--primary-color)] grow-2 py-2 rounded-md hover:bg-[var(--primary-hover)] cursor-pointer"
                    >
                      <p className="text-white font-semibold" type="submit">
                        {isPending ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          "Find Jobs"
                        )}
                      </p>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="min-h-[80vh] flex justify-center items-center flex-col gap-10 px-5">
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
