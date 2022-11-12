const refs = {
  inputRangeEl: document.querySelector("#font-size-control"),
  spanText: document.querySelector("#text"),
};

refs.inputRangeEl.addEventListener("input", onclick);

function onclick(event) {
  refs.spanText.style.fontSize = `${event.target.value}px`;
}
