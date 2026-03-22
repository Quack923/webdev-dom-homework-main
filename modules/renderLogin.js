import { fetchAndRenderComments } from "../index.js"
import { login, setName, setToken } from "./api.js"
import { renderReg } from "./renderReg.js"
import { initEventListeners } from "./eventList.js"
import { renderComments } from "./renderStudents.js"

export const renderLogin = () => {
  const container = document.querySelector('.container')

  const loginHtml = `
  <section class="add-form">
    <h1>Форма входа</h1>
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
        Войти </button>
      <u class="add-form-button-link registry" >
        Зарегистрироваться
      </u>
    </fieldset>
  </section>
  `
  container.innerHTML = loginHtml

  document.querySelector('.registry').addEventListener('click',()=>{
    renderReg()
  })

  const loginEl = document.querySelector('#login')
  const passwordEl = document.querySelector('#password')
  const subButtoEl = document.querySelector('#button-main')

  subButtoEl.addEventListener("click", () => {
    login({ 
        login: loginEl.value, 
        password: passwordEl.value 
    }).then((data) => {
        setToken(data.user.token)
        setName(data.user.name)
        fetchAndRenderComments()
         initEventListeners(renderComments)
         
    
    })
  })
}
