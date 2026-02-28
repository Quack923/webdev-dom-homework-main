import { renderComments } from "./modules/renderStudents.js";
import { updateComment } from "./modules/arrComments.js";
export const commentsList = document.querySelector(".comments");
import { addButton } from "./modules/validateForm.js";
import { fetchComments } from './modules/api.js';
import {initEventListeners} from "./modules/eventList.js";

  fetchComments().then((data) => {
    updateComment(data);
    renderComments();  
});
initEventListeners(renderComments);