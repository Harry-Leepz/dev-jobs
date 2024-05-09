import {
  BASE_API_URL,
  jobDetailsContentEl,
  jobListSearchEl,
} from "../common.js";

import renderLoading from "./Loading.js";

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
        console.log("Something went wrong!");
        return;
      }
      return response.json();
    })
    .then((data) => {
      const { jobItem } = data;
      renderLoading("job-listing");

      // render html content
      const htmlContent = `
        <img src="${
          jobItem.coverImgURL
        }" alt="#" class="job-details__cover-img">

        <a class="apply-btn" href="${
          jobItem.companyURL
        }" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

        <section class="job-info">
          <div class="job-info__left">
              <div class="job-info__badge">${jobItem.badgeLetters}</div>
              <div class="job-info__below-badge">
                  <time class="job-info__time">${jobItem.daysAgo}d</time>
                  <button class="job-info__bookmark-btn">
                      <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
                  </button>
              </div>
          </div>
          <div class="job-info__right">
              <h2 class="second-heading">${jobItem.title}</h2>
              <p class="job-info__company">${jobItem.company}</p>
              <p class="job-info__description">${jobItem.description}</p>
              <div class="job-info__extras">
                  <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i>${
                    jobItem.duration
                  }</p>
                  <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i>${
                    jobItem.salary
                  }</p>
                  <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i>${
                    jobItem.location
                  }</p>
              </div>
          </div>
        </section>

        <div class="job-details__other">
            <section class="qualifications">
                <div class="qualifications__left">
                    <h4 class="fourth-heading">Qualifications</h4>
                    <p class="qualifications__sub-text">Other qualifications may apply</p>
                </div>
                <ul class="qualifications__list">
                    ${jobItem.qualifications
                      .map(
                        (item) =>
                          `<li class="qualifications__item">${item}</li>`
                      )
                      .join("")}
                </ul>
            </section>

            <section class="reviews">
                <div class="reviews__left">
                    <h4 class="fourth-heading">Company reviews</h4>
                    <p class="reviews__sub-text">Recent things people are saying</p>
                </div>
                <ul class="reviews__list">
                  ${jobItem.reviews
                    .map(
                      (review) =>
                        `<li class="qualifications__item">${review}</li>`
                    )
                    .join("")}
                </ul>
            </section>
        </div>

        <footer class="job-details__footer">
            <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
        </footer>
      `;
      jobDetailsContentEl.innerHTML = htmlContent;
    })
    .catch((error) => {
      console.log(error);
    });
};

jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;
