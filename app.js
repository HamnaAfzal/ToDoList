const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

let storedItems = JSON.parse(localStorage.getItem("todos")) || [];

const addToDo = (item) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    ${item}
    <i class="fas fa-times"></i>
  `;

  listItem.addEventListener("click", function () {
    this.classList.toggle("done");
  });
  listItem.querySelector("i").addEventListener("click", function () {
    listItem.remove();
    removeItemAndStoreItems(item);
  });

  toDoBox.appendChild(listItem);
};

storedItems.forEach((storedItem) => {
  addToDo(storedItem);
});

item.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addToDoAndStore(this.value);
    this.value = "";
  }
});

const addToDoAndStore = (item) => {
  addToDo(item);
  storedItems.push(item);
  storeItems();
};

const removeItemAndStoreItems = (item) => {
  const index = storedItems.indexOf(item);
  if (index > -1) {
    storedItems.splice(index, 1);
    storeItems();
  }
};

const storeItems = () => {
  localStorage.setItem("todos", JSON.stringify(storedItems));
};
