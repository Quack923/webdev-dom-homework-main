import { comments } from "./arrComments.js";
import { clearHtml } from "./sanitaze.js";
import {initEventListeners} from "./eventList.js";


export const renderComments = () => {
    const commentsList = document.querySelector(".comments");

    if (!commentsList) {
        console.warn("Элемент .comments не найден на странице!");
        return;
    }

    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
            <div class="comment-header">
                <div>${clearHtml(comment.name)}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text" style="white-space: pre-line;">
                    ${clearHtml(comment.text)}
                </div>
            </div>
            <div class="comment-footer">
                <button class="reply-button" data-index="${index}">Ответить</button>
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
                </div>
            </div>
        </li>`;
    }).join("");

    commentsList.innerHTML = commentsHtml;

    initEventListeners(renderComments);
};