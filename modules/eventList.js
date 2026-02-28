import { comments } from "./arrComments.js";

export const initEventListeners = (renderFunction) => {
  const likeButtons = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtons) {
    likeButton.onclick = (event) => {
      event.stopPropagation();

            const index = likeButton.dataset.index;
            const comment = comments[index];


            if (comment.isLiked) {
                comment.likes -= 1;
                comment.isLiked = false;
            } else {
                comment.likes    += 1;
                comment.isLiked = true;
            }

            renderFunction();
        };
    }


    const replyButtons = document.querySelectorAll(".reply-button");
    const commentInput = document.querySelector(".add-form-text");

    for (const replyButton of replyButtons) {
        replyButton.onclick = () => {
            const index = replyButton.dataset.index;
            const comment = comments[index];

            commentInput.value = `> ${comment.text}\n\n${comment.name}, `;


            commentInput.focus();
        };
    }
  };