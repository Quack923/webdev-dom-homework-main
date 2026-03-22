import { postComment, fetchComments } from "./api.js"; 
import { updateComment } from "./arrComments.js";
import { renderComments } from "./renderStudents.js";

export const validButn = () => {
  const addButton = document.querySelector(".add-form-button");
  const commentInput = document.querySelector(".add-form-text");

  if (!addButton) return;

  addButton.addEventListener("click", () => {
    if (commentInput.value.trim() === "") {
      alert("Заполните текст комментария!");
      return;
    }

    const commentLoad = document.querySelector('.add-form_load');
    const commentForm = document.querySelector('.add-form');

    if (commentLoad) commentLoad.style.display = 'block';
    if (commentForm) commentForm.style.display = 'none';

    
    postComment(commentInput.value)
      .then(() => {
        return fetchComments();
      })
      .then((newComments) => {
        updateComment(newComments);
        renderComments();
        
        commentInput.value = "";
        if (commentLoad) commentLoad.style.display = 'none';
        if (commentForm) commentForm.style.display = 'flex';
      })
      .catch((error) => {
        if (commentLoad) commentLoad.style.display = 'none';
        if (commentForm) commentForm.style.display = 'flex';
        alert(error.message);
      });
  });
};
