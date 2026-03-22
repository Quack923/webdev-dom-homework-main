import { fetchAndRenderComments } from "../index.js"
import {  registration, setName, setToken, token } from "./api.js"
import { renderLogin } from "./renderLogin.js"
import { initEventListeners } from "./eventList.js"
import { renderComments } from "./renderStudents.js"

export const renderReg = () => {
  const container = document.querySelector('.container')

  const loginHtml = `
  <section class="add-form">
    <h1>Форма регистрации</h1>
     <input
      type="text"
      class="add-form-name"
      placeholder="Введите имя"
      id="name"
      required
    />
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите логин"
      id="login"
      required
    />
    <input
      type="password"
      class="add-form-name"
      placeholder="Введите пароль"
      id="password"
      required
    />
    <fieldset class="add-form-registry">
      <button class="add-form-button-main button-main" id="button-main" type="submit">
        зарегистрироваться </button>
      <u class="add-form-button-link entry" >
       войти
      </u>
    </fieldset>
  </section>
  `
  container.innerHTML = loginHtml
  document.querySelector('.entry').addEventListener('click',()=>{
    renderLogin()
  })
const nameEl = document.querySelector('#name')
  const loginEl = document.querySelector('#login')
  const passwordEl = document.querySelector('#password')
  const subButtoEl = document.querySelector('#button-main')

  subButtoEl.addEventListener("click", () => {
    registration({
        name:nameEl.value,
        login: loginEl.value, 
        password: passwordEl.value 
    }).then((data) => {
        setToken(data.user.token)
        setName(data.user.name)
        fetchAndRenderComments()
       initEventListeners(renderComments);
    
    })
  })
}
