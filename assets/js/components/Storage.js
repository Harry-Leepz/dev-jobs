import { state } from "../common.js";

const storedBookmarkItems = localStorage.getItem("bookmarkJobItems");
if (storedBookmarkItems) {
  state.bookmarksJobItems = JSON.parse(storedBookmarkItems);
}
