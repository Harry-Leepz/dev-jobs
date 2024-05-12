import {
  BASE_API_URL,
  jobDetailsContentEl,
  jobListSearchEl,
} from "../common.js";

import renderLoading from "./Loading.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = (jobListArray) => {
  jobListArray.slice(0, 7).forEach((jobItem) => {
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

const clickHandler = (event) => {
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
  fetch(`${BASE_API_URL}/jobs?/${jobItemId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("There seems to be a problem with the request!");
      }
      return response.json();
    })
    .then((data) => {
      const { jobItem } = data;
      renderLoading("job-listing");
      renderJobDetails(jobItem);
    })
    .catch((error) => {
      renderLoading("job-details");
      renderError(error);
    });
};

jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;
