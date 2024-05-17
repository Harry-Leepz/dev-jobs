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
  const clickedButtonEl = event.target.closest("pagination__button");

  // stop function if a non button element is clicked
  if (!clickedButtonEl) return;
};

paginationEl.addEventListener("click", clickHandler);
