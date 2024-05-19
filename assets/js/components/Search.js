import {
  BASE_API_URL,
  state,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  getData,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";

import renderError from "./Error.js";
import renderLoading from "./Loading.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

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

  // reset sorting to relevnancy
  sortingBtnRecentEl.classList.remove("sorting__button--active");
  sortingBtnRelevantEl.classList.add("sorting__button--active");

  // fetch data
  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    const { jobItems } = data;
    state.searchJobItems = jobItems;
    state.currentPage = 1;

    // dom updates
    renderLoading("search");
    numberEl.textContent = jobItems.length;
    renderPaginationButtons();
    renderJobList();
  } catch (error) {
    renderLoading("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
