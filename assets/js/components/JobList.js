import {
  BASE_API_URL,
  DEFAULT_RESULTS_PER_PAGE,
  state,
  jobDetailsContentEl,
  jobListSearchEl,
  getData,
} from "../common.js";

import renderLoading from "./Loading.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = () => {
  // remove previous search job items
  jobListSearchEl.innerHTML = "";

  // display new search job items
  state.searchJobItems
    .slice(
      state.currentPage * DEFAULT_RESULTS_PER_PAGE - DEFAULT_RESULTS_PER_PAGE,
      state.currentPage * DEFAULT_RESULTS_PER_PAGE
    )
    .forEach((jobItem) => {
      const {
        id,
        badgeLetters,
        title,
        company,
        duration,
        salary,
        location,
        daysAgo,
      } = jobItem;
      const jobItemsHtml = `
        <li class="job-item">
          <a class="job-item__link" href="${id}">
              <div class="job-item__badge">${badgeLetters}</div>
              <div class="job-item__middle">
                  <h3 class="third-heading">${title}</h3>
                  <p class="job-item__company">${company}</p>
                  <div class="job-item__extras">
                      <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${duration}</p>
                      <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${salary}</p>
                      <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${location}</p>
                  </div>
              </div>
              <div class="job-item__right">
                  <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                  <time class="job-item__time">${daysAgo}d</time>
              </div>
          </a>
        </li>
  `;
      jobListSearchEl.insertAdjacentHTML("beforeend", jobItemsHtml);
    });
};

const clickHandler = async (event) => {
  event.preventDefault();

  // get the clicked element and show visual indicator
  const jobItemEl = event.target.closest(".job-item");
  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");
  jobItemEl.classList.add("job-item--active");

  // clear job details and show loading element
  jobDetailsContentEl.innerHTML = "";
  renderLoading("job-listing");

  // get the job item id and make fetch request
  const jobItemId = jobItemEl.children[0].getAttribute("href");

  // add id to URL
  history.pushState(null, "", `/#${jobItemId}`);

  try {
    const data = await getData(`${BASE_API_URL}/jobs?/${jobItemId}`);

    const { jobItem } = data;
    // DOM updates
    renderLoading("job-listing");
    renderJobDetails(jobItem);
  } catch (error) {
    renderLoading("job-details");
    renderError(error.message);
  }
};

jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;
