const nameInput = document.querySelector(".add-form-name");
const commentInput = document.querySelector(".add-form-text");
import { postComment } from "./api.js";
import { comments, updateComment } from "./arrComments.js";
import { renderComments } from "./renderStudents.js";
 export const addButton = document.querySelector(".add-form-button");

   addButton.addEventListener("click", () => {
    if (nameInput.value.trim() === "" || commentInput.value.trim() === "") {
        alert("Заполните все поля!");
        return;
    }

    const now = new Date();
    const dateTime = now.toLocaleString().slice(0, -3);
    


     postComment(nameInput.value,commentInput.value).then(
        (data) => { 
            updateComment(data)
            renderComments()
            nameInput.value = ""
            commentInput.value = ""
        },
     )  
});
