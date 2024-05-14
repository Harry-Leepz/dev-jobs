import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";

const clickHandler = (event) => {
  // get clicked button element
  const clickedButtonEl = event.target.closest(".sorting__button");

  // stop function if no button element is clicked
  if (!clickedButtonEl) return;

  // check to see if click button is recent
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  if (recent) {
    console.log("recent");
  }

  if (!recent) {
    console.log("relevant");
  }
};

sortingEl.addEventListener("click", clickHandler);
