import { comments } from "./arrComments.js";
import { clearHtml } from "./sanitaze.js";
import { initEventListeners } from "./eventList.js";
import { renderLogin } from "./renderLogin.js";
import { name, token } from "./api.js";

const container = document.querySelector(".container");

export const renderComments = () => {
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

  const addCommentsHtml = `
    <div class="add-form">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя"
      readonly value= "${name}"/>
      <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
      </div>
    </div>`;

  const linkToLoginText = `<p>Необходимо <span class="link-login" style="cursor:pointer; text-decoration:underline;">авторизироваться</span>, чтобы оставить комментарий</p>`;

  const baseHtml = `
    <ul class="comments">${commentsHtml}</ul>
    ${token ? addCommentsHtml : linkToLoginText} 
  `;

  container.innerHTML = baseHtml;

  if (token) {
    initEventListeners(renderComments);
  } else {
    const loginLink = document.querySelector(".link-login");
    if (loginLink) {
      loginLink.addEventListener("click", () => {
        renderLogin();
      });
    }
  }
};
