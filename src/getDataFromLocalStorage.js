import { updateView } from './updateView';


export const getDataFromLocalStorage = () => {
  const todoList = localStorage.getItem('todoList');
  return JSON.parse(todoList);
};

export const storeItem = (items) => {
  if (items.length > 0) {
    localStorage.setItem('todoList', JSON.stringify(items));
  } else {
    localStorage.clear();
  }
};
export const clearLocalStorage = () => {
  const todoListArr = getDataFromLocalStorage();
  if (todoListArr) {
    let counter = todoListArr.length;
    while (counter > 0) {
      if (todoListArr[counter - 1].completed) {
        todoListArr.splice(counter - 1, 1);
      }
      counter -= 1;
    }
    storeItem(todoListArr);
    updateView();
  }
};

export const clearInput = () => {
  document.getElementById('todoListInput').value = '';
};
