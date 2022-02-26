import { updateView } from './updateView';
import { toggleEdit } from './index';
import { getDataFromLocalStorage, storeItem, clearInput } from "./getDataFromLocalStorage";

export const saveEdit = (id, element) => {
  const newInputValue = document.getElementById(`input_${id.split('_')[1]}`);
  const todoListArr = getDataFromLocalStorage();
  const arrIndex = todoListArr.findIndex((item) => `${element}_${item.id}` === id);
  todoListArr[arrIndex].description = newInputValue.value;
  storeItem(todoListArr);
  toggleEdit(`toggleMode_${id.split('_')[1]}`, 'toggleMode');
};
export const deleteItem = (id, element) => {
  const todoListArr = getDataFromLocalStorage();
  const arrIndex = todoListArr.findIndex((item) => `${element}_${item.id}` === id);
  todoListArr.splice(arrIndex, 1);

  for (let i = 0; i < todoListArr.length; i += 1) {
    todoListArr[i].index = i + 1;
  }
  storeItem(todoListArr);
  updateView();
};
export const addItem = (data) => {
  const item = {
    completed: false,
    description: data,
    id: Math.random().toString(16).slice(2),
    editable: false,
    index: 1,
  };
  const previousTodoList = getDataFromLocalStorage();
  let todoList = [];
  if (previousTodoList !== null) {
    item.index = previousTodoList.length + 1;
    todoList = [...getDataFromLocalStorage(), item];
  } else {
    todoList.push(item);
  }
  storeItem(todoList);
  clearInput();
  updateView();
};
