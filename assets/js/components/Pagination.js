import {
  DEFAULT_RESULTS_PER_PAGE,
  state,
  paginationEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
} from "../common.js";

import renderJobList from "./JobList.js";

const renderPaginationButtons = () => {
  // display the back pagination button fi we are on page 2
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  // display the nexy pagination button if there are more job items to show on next page
  if (
    state.searchJobItems.length -
      state.currentPage * DEFAULT_RESULTS_PER_PAGE <=
    0
  ) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  // update the page number text inside the pagination buttons
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  // remove focus from clicked buttons (blur)
  paginationBtnBackEl.blur();
  paginationBtnNextEl.blur();
};

const clickHandler = (event) => {
  // get the clicked element
  const clickedButtonEl = event.target.closest(".pagination__button");

  // stop function if a non button element is clicked
  if (!clickedButtonEl) return;

  // check if click button is for next or back
  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  // update state byt incrementing or decrementing the page number
  nextPage ? state.currentPage++ : state.currentPage--;

  // render pagination buttons
  renderPaginationButtons();

  // render job items for the relevant page
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButtons;
