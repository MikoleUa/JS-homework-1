const refForm = document.querySelector(".login-form");

refForm.addEventListener("submit", onFormSubmit2);

function onFormSubmat(event) {
  event.preventDefault();

  const {
    elements: { password, email },
  } = event.currentTarget;

  if (email.value === "" || password.value === "") {
    alert("Всі поля повинні бути заповненні");
  } else {
    const formObj = {
      email: email.value,
      password: password.value,
    };
    console.log(formObj);
  }

  event.currentTarget.reset();
}
// 2 варіант. Через FormData

function onFormSubmit2(event) {
  event.preventDefault();
  const {
    elements: { password, email },
  } = event.currentTarget;
  if (email.value === "" || password.value === "") {
    return alert("Всі поля повинні бути заповненні");
  } else {
    const formData = new FormData(event.currentTarget);
    const obj1 = {};
    formData.forEach((value, name) => {
      obj1[name] = value;
    });
    console.log(formData);
  }
  event.currentTarget.reset();
}
