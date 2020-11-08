function loadItems() {
  return fetch("../data/data.json") //
    .then((response) => response.json())
    .then((result) => result.items);
}

function displayAllItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
  <li class="item">
    <img class="item__thumbnail" src=${item.image}  alt=${item.type} />
    <span class="item__description">${item.size}, ${item.gender}</span>
  </li>
`;
}

function setEventListener(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayAllItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

function onButtonClick(event, items) {
  const key = event.target.dataset.key;
  const value = event.target.dataset.value;

  updateItem(key, value, items);
}

function updateItem(key, value, items) {
  const listItems = document.querySelectorAll(".items li");
  // console.log(listItems);
  items.forEach((item, index) => {
    if (item[key] === value) {
      listItems.classList.remove("invisible");
    } else {
      listItems[index].classList.add("invisible");
    }
  });
}
loadItems() //
  .then((items) => {
    displayAllItems(items);
    setEventListener(items);
  })
  .catch(console.log("error"));
