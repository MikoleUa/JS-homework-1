const refInputEl = document.querySelector('input[data-length="6"]');

refInputEl.addEventListener("blur", onInput);

function onInput(event) {
  if (refInputEl.value.length === Number(refInputEl.dataset.length)) {
    refInputEl.classList.replace("invalid", "valid");
  } else if (refInputEl.value.length > 0) {
    refInputEl.classList.add("invalid");
    console.log(123);
  } else {
    refInputEl.classList.remove("invalid", "valid");
  }
}
