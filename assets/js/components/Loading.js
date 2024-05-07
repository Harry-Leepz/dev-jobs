import { spinnerSearchEl, spinnerJobDetailsEl } from "../selectors";

const renderLoading = (loadingLocation) => {
  const loadingEl =
    loadingLocation === "search" ? spinnerSearchEl : spinnerJobDetailsEl;
  loadingEl.classList.toggle("spinner--visible");
};

export default renderLoading;
