function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refElements = document.querySelector(".widget");
const refSpan = document.querySelector(".color");
refElements.addEventListener("click", onClick);

function onClick(event) {
  const fnColor = getRandomHexColor();
  if (event.target.hasAttribute("type")) {
    document.body.style.backgroundColor = fnColor;
    refSpan.textContent = fnColor;
  }
  console.log(event);
}
