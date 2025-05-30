const API_CODE = import.meta.env.VITE_API_CODE;

export const getJobs = async (keywords, location, page, salary) => {
  try {
    const reqData = constructRequestData(keywords, location, page, salary);
    const response = await fetch(`https://id.jooble.org/api/${API_CODE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    if (!response.ok) {
      return new Error("Failed to fetch jobs");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error(error.message);
  }
};

const constructRequestData = (keywords, location, page, salary = null) => {
  if (salary) {
    return {
      keywords: keywords,
      location: location,
      page: page,
      ResultOnPage: 10,
      salary,
    };
  }

  return {
    keywords: keywords,
    location: location,
    page: page,
    ResultOnPage: 10,
  };
};
