import { spinnerSearchEl, spinnerJobDetailsEl } from "../selectors.js";

const renderLoading = (loadingLocation) => {
  const loadingEl =
    loadingLocation === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  loadingEl.classList.toggle("spinner--visible");
};

export default renderLoading;
