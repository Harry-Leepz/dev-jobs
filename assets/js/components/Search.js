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

const submitHandler = (event) => {
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
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((response) => {
      if (!response.ok) {
        console.log("Something went wrong!");
        return;
      }
      return response.json();
    })
    .then((data) => {
      const { jobItems } = data;
      console.log(jobItems);

      // dom update
      renderLoading("search");
      numberEl.textContent = jobItems.length;
      renderJobList(jobItems);
    })
    .catch((error) => {
      console.log(error);
    });
};

searchFormEl.addEventListener("submit", submitHandler);
