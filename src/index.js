import { getDataFromLocalStorage, storeItem, clearLocalStorage } from './getDataFromLocalStorage';
import { addItem, saveEdit, deleteItem } from './saveEdit';
import './style.css';
import { updateView } from './updateView';

const toggleCheckbox = (id) => {
  const todoListArr = getDataFromLocalStorage();
  const checkboxElement = document.getElementById(id).checked;
  const arrIndex = todoListArr.findIndex((item) => `checkbox_${item.id}` === id);
  todoListArr[arrIndex].completed = checkboxElement;
  storeItem(todoListArr);
  updateView();
};

export const toggleEdit = (id, element) => {
  const todoListArr = getDataFromLocalStorage();
  const arrIndex = todoListArr.findIndex((item) => `${element}_${item.id}` === id);
  todoListArr[arrIndex].editable = !todoListArr[arrIndex].editable;
  storeItem(todoListArr);
  updateView();
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addItem(formData.get('new-todo'));
  });

  document
    .getElementById('todo-list')
    .addEventListener('click', (e) => {
      if (e.target.type === 'checkbox') {
        toggleCheckbox(e.target.id);
      } else if (e.target.type === 'button') {
        const eventType = String(e.target.id);
        if (eventType.indexOf('save') !== -1) {
          saveEdit(e.target.id, 'save');
        }
        if (eventType.indexOf('delete') !== -1) {
          deleteItem(e.target.id, 'delete');
        }
        if (eventType.indexOf('toggleMode') !== -1) {
          toggleEdit(e.target.id, 'toggleMode');
        }
      }
    });

  document
    .getElementById('clear-completed-button')
    .addEventListener('click', () => {
      clearLocalStorage();
    });
});

document.addEventListener('load', updateView());
