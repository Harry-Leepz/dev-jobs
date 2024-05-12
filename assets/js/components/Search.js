import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
} from "../common.js";

import renderError from "./Error.js";
import renderLoading from "./Loading.js";
import renderJobList from "./JobList.js";

const submitHandler = async (event) => {
  event.preventDefault();

  const searchText = searchInputEl.value.trim().toLowerCase();

  // check the search input value for any numbers and show error
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("Your search may not contain numbers!");
    return;
  }
  searchFormEl.blur();

  // loading
  renderLoading("search");
  jobListSearchEl.innerHTML = "";

  // fetch data
  try {
    const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.description);
    }

    const { jobItems } = data;

    // dom updates
    renderLoading("search");
    numberEl.textContent = jobItems.length;
    renderJobList(jobItems);
  } catch (error) {
    renderLoading("search");
    renderError(error.message);
  }
  // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("There seems to be a problem with the request!");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const { jobItems } = data;
  //     console.log(jobItems);

  //     // dom update
  //     renderLoading("search");
  //     numberEl.textContent = jobItems.length;
  //     renderJobList(jobItems);
  //   })
  //   .catch((error) => {
  //     renderLoading("search");
  //     renderError(error);
  //   });
};

searchFormEl.addEventListener("submit", submitHandler);
