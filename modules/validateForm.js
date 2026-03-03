const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
import { postComment } from "./api.js";
import {  updateComment } from "./arrComments.js";
import { renderComments } from "./renderStudents.js";
function delay(interval = 500) {
   return new Promise((resolve) => {
      setTimeout(() => {
      resolve();
      }, interval);
   });
}

 export const addButton = document.querySelector(".add-form-button");

   addButton.addEventListener("click", () => {
    if (nameInput.value.trim() === "" || commentInput.value.trim() === "") {
        alert("Заполните все поля!");
        return;
    }
     const commentLoad = document.querySelector('.add-form_load').style.display = 'block'
     const commentForm = document.querySelector('.add-form').style.display = 'none'

    const now = new Date();
    const dateTime = now.toLocaleString().slice(0, -3);

    
         postComment(nameInput.value,commentInput.value).then(
        (data) => {
         delay(200).then(() => {
        document.querySelector('.add-form_load').style.display = 'none'
        document.querySelector('.add-form').style.display = 'flex'
})
            updateComment(data)
            renderComments()
            nameInput.value = ""
            commentInput.value = ""
        },
     )  
});
