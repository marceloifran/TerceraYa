// jshint esversion: 8
import { login, logout } from "./auth.js";
import { insert, getItems, update } from "./firestore.js";
import { getUUID } from "./utils.js";
let currentUser;

let todos = [];

const buttonLogin = document.getElementById("button-login");
const buttonLogout = document.getElementById("button-logout");
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const userInfo = document.getElementById("user-info");
const todosContainer = document.getElementById("todos-container");
const mostrar = document.getElementById("mostrar");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    currentUser = user;
    init();
  } else {
  }
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value;
  if (text !== "") {
    addTodo(text);
  }
});

buttonLogin.addEventListener("click", async (e) => {
  try {
    currentUser = await login();
    init();
    mostrar.classList.add("hidden");

  } catch (error) {
    console.error(error);
  }
});

buttonLogout.addEventListener("click", (e) => {
  logout();
  //localStorage.removeItem("user");
  mostrar.classList.remove("hidden");
  buttonLogin.classList.remove("hidden");
  buttonLogout.classList.add("hidden");
  todoForm.classList.add("hidden");
  todosContainer.innerHTML = "";
});

async function init() {
  //localStorage.setItem("user", JSON.stringify(currentUser));
  buttonLogin.classList.add("hidden");
  buttonLogout.classList.remove("hidden");
  todoForm.classList.remove("hidden");
  userInfo.innerHTML = `
    <img src="${currentUser.photoURL}" width="32" />
    <h2>${currentUser.displayName}</h2>
  `;

  loadTodos();
}

async function addTodo(text) {
  try {
    const todo = {
      id: getUUID(),
      text: text,
      fecha: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
      userid: currentUser.uid,
      username: currentUser.displayName,
    };
    const response = await insert(todo);
    loadTodos();
  } catch (error) {
    console.error(error);
  }
}

async function loadTodos() {
  todosContainer.innerHTML = "";
  todos = [];

  try {
    const response = await getItems(currentUser.uid);

    todos = [...response];
    renderTodos();
  } catch (error) {
    console.error(error);
  }
}

function renderTodos() {
  let html = "";
  todos.forEach((todo) => {
    html += `
      <li>
       
        <label for="${todo.id}">${todo.text}  | ${todo.fecha}</label>
      </li>
    `;
  });

  todosContainer.innerHTML = html;

  document
    .querySelectorAll('#todos-container input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("change", async (e) => {
        const id = e.target.id;
        try {
          await update(id, e.target.checked);
        } catch (error) {
          console.error(error);
        }
      });
    });
}
