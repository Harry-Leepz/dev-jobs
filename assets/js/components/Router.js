import {
  BASE_API_URL,
  state,
  getData,
  jobDetailsContentEl,
} from "../common.js";

import renderLoading from "./Loading.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";

const loadHashChangeHandler = async () => {
  // get the job item id from url and remove the hash from the start
  const id = location.hash.substring(1);

  if (id) {
    // remove previous job details content
    jobDetailsContentEl.innerHTML = "";

    // remove active class for all other job items
    document
      .querySelectorAll(".job-item--active")
      .forEach((jobItemWithActiveClass) =>
        jobItemWithActiveClass.classList.remove("job-item--active")
      );

    // show loading spinner
    renderLoading("job-details");

    try {
      const data = await getData(`${BASE_API_URL}/jobs?/${id}`);

      const { jobItem } = data;

      // updating the state
      state.activeJobItem = jobItem;
      renderJobList();

      // DOM updates
      renderLoading("job-details");
      renderJobDetails(jobItem);
    } catch (error) {
      renderLoading("job-details");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler);
