const refs = {
  counter: document.querySelector("#counter"),
  decrement: document.querySelector("button[data-action='decrement']"),
  increment: document.querySelector("button[data-action='increment']"),
  value: document.querySelector("#value"),
};
const createClearBtn = document.createElement("button");
createClearBtn.textContent = "Очитстити";
createClearBtn.classList.add("btnClear");

refs.counter.addEventListener("click", () => {
  refs.counter.append(createClearBtn);
});

refs.counter.addEventListener("click", action);
function action(event) {
  switch (event.target) {
    case refs.decrement:
      refs.value.textContent -= 1;
      break;
    case refs.increment:
      refs.value.textContent = Number(refs.value.textContent) + 1;
      break;

    default:
      refs.value.textContent = 0;
      document.querySelector(".btnClear").remove();
  }
  // if (!document.querySelector(".btnClear")) {
  //   refs.counter.insertAdjacentHTML(
  //     "beforeend",
  //     `      <button class="btnClear" type="button">Очитстити</button>
  //       `
  //   );
  // } else {
  //   document.querySelector(".btnClear").remove();
  // }
}
