const init = () => {
  function searchUrl() {
    var currentLocation = window.location.pathname;
    const url = `./data.json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => (document.getElementById("logo").src = data.logo));
  }

  searchUrl();

  const inputNome = document.querySelector('input[name="name"]');
  const inputEmail = document.querySelector('input[type="email"]');
  const inputTelefone = document.querySelector('input[name="phone"]');
  const inputCPF = document.querySelector('input[name="cpf"]');
  const submitButton = document.getElementById("button");

  alert("init carregada");

  const validateEmail = (event) => {
    const input = event.currentTarget;
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = regex.test(input.value);
    if (!emailTest) {
      submitButton.setAttribute("disabled", "disabled");
      input.nextElementSibling.classList.add("error");
    } else {
      submitButton.removeAttribute("disabled");
      input.nextElementSibling.classList.remove("error");
    }
  };

  const validateLength = (event) => {
    const input = event.currentTarget;

    if (input.value.length < 8) {
      submitButton.setAttribute("disabled", "disabled");
      input.nextElementSibling.classList.add("error");
    } else {
      submitButton.removeAttribute("disabled");
      input.nextElementSibling.classList.remove("error");
    }
  };

  const validateOnly = (event) => {
    const input = event.currentTarget;

    if (input.value.length == 0) submitButton.removeAttribute("disabled");
  };

  const errorHandler = () => {
    submitButton.classList.remove("success");
    submitButton.classList.add("error");
    submitButton.textContent = "Dados inválidos";
  };

  if (submitButton) {
    submitButton.addEventListener("click", (event) => {
      
      inputEmail.addEventListener("input", validateEmail);
      inputCPF.addEventListener("input", validateLength);
      inputTelefone.addEventListener("input", validateLength);
      inputNome.addEventListener("input", validateOnly);
      inputTelefone.addEventListener("input", validateOnly);
      alert("teste");
      //submitButton.textContent = "...loading"
    });
  }
};

window.onload = init;
