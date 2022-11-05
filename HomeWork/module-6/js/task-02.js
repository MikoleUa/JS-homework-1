const ingredients = [
  "Potatoes",
  "Mushrooms",
  "Garlic",
  "Tomatos",
  "Herbs",
  "Condiments",
];

function creteEl(e) {
  const elemLi = document.createElement("li");
  elemLi.textContent = e;
  elemLi.classList = "item";
  return elemLi;
}
const createelementListLi = ingredients.map(creteEl);
document.querySelector("#ingredients").append(...createelementListLi);
