import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";

import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // check if the element clicked is outside the bookmarks button
  if (!event.target.className.includes("bookmark")) return;

  // determine if the job item already exists in the bookmarks list,
  // if so the remove it, else add it to the list
  if (
    state.bookmarksJobItems.some(
      (jobItem) => jobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarksJobItems = state.bookmarksJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    // update state by adding the jobitem to the bookmarks array
    state.bookmarksJobItems.push(state.activeJobItem);
  }

  // update bookmarks icon styling
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");

  renderJobList("bookmarks");
};

const mouseEnterHandler = (event) => {
  // make bookmarks button look active
  bookmarksBtnEl.classList.add("bookmarks-btn--active");

  // make job list visible
  jobListBookmarksEl.classList.add("job-list--visible");
};

const mouseLeaveHandler = () => {
  // make bookmarks button look active
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");

  // make job list non visible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
