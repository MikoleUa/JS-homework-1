function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refsElem = {
  elemConrol: document.querySelector("#controls"),
  elemBoxes: document.querySelector("#boxes"),
  elemValue: document.querySelector("#controls input"),
};
const { elemBoxes, elemConrol, elemValue } = refsElem;

elemConrol.addEventListener("click", handleClick);

function handleClick(event) {
  let elements = "";
  for (let i = 0; i < Number(elemValue.value); i += 1) {
    elements += `<div style="background: ${getRandomHexColor()}; width: ${
      i * 10 + 30
    }px; height: ${i * 10 + 30}px"></div>`;
  }
  if (event.target.hasAttribute("data-create")) {
    elemBoxes.insertAdjacentHTML("beforeend", elements);
  }
  if (event.target.hasAttribute("data-destroy")) {
    elemBoxes.innerHTML = "";
  }
}
