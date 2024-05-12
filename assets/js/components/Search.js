import {
  BASE_API_URL,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  getData,
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
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    const { jobItems } = data;

    // dom updates
    renderLoading("search");
    numberEl.textContent = jobItems.length;
    renderJobList(jobItems);
  } catch (error) {
    renderLoading("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
