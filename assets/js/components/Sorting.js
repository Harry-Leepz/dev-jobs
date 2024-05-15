import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // get clicked button element
  const clickedButtonEl = event.target.closest(".sorting__button");

  // stop function if no button element is clicked
  if (!clickedButtonEl) return;

  // check to see if click button is recent
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  // update css styling on button to show current active state
  // sorting__button--active
  if (recent) {
    sortingBtnRelevantEl.classList.toggle("sorting__button--active");
    sortingBtnRecentEl.classList.toggle("sorting__button--active");
  }

  if (!recent) {
    sortingBtnRelevantEl.classList.toggle("sorting__button--active");
    sortingBtnRecentEl.classList.toggle("sorting__button--active");
  }

  // sort jobList data by recent
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  }

  // sort jobList data by relevancy
  if (!recent) {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }

  // render sorted JobList in the DOM
  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
