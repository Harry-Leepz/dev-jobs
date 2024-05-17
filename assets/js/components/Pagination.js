import {
  state,
  paginationEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
} from "../common.js";

import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // get the clicked element
  const clickedButtonEl = event.target.closest(".pagination__button");

  // stop function if a non button element is clicked
  if (!clickedButtonEl) return;

  // check if click button is for next or back
  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  // update state byt incrementing or decrementing the page number
  nextPage ? state.currentPage++ : state.currentPage--;

  // render job items for the relevant page
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);
