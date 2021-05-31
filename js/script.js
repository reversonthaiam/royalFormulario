const init = () => {
  buttonSubmit = {
    button: document.querySelector("#button"),
    enable: function () {
      this.button.classList.add("disabled");
      document.getElementById("button").disabled = false;
    },
    disable: function () {
     
      this.button.classList.remove("disabled");
      document.getElementById("button").disabled = true;
    },
  };

  buttonSubmit.disable();

  function searchUrl() {
    var currentLocation = window.location.pathname;
    const url = `./data.json`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => (document.getElementById("logo").src = data.logo));
  }

  searchUrl();


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
    const input = event.target;
    return input.value.length > 3;
  };

  const errorHandler = () => {
    submitButton.classList.remove("success");
    submitButton.classList.add("error");
    submitButton.textContent = "Dados inválidos";
  };


  document.querySelectorAll("input").forEach((listaInput) => {
    listaInput.addEventListener("keyup", (event) => {
      let input = event.target;
      let response;
      switch (input.name) {
        case "name":
          response = validateOnly(event);
          console.log(response);
          break;

        case "mail":
          response = validateOnly(event);
          //inputEmail.addEventListener("input", validateEmail);
          console.log(response);

          break;

        case "cpf":
          response = validateOnly(event);
          //inputCPF.addEventListener("input", validateLength);
          console.log(response);

          break;

        case "phone":
          response = validateOnly(event);
          //inputTelefone.addEventListener("input", validateLength);
          //inputTelefone.addEventListener("input", validateOnly);
          console.log(response);

          break;

        default:
          0;
      }

      if (response) {
        input.setAttribute("valid", true);
      } else {
        input.setAttribute("valid", false);
      }

      checkButton();
    });
  });

  const checkButton = () => {
    const totalValid = document.querySelectorAll('input[valid="true"]').length;

    if (totalValid == document.querySelectorAll("input").length) {
      buttonSubmit.enable();
    } else {
      buttonSubmit.disable();
    }
  };
};

window.onload = init;
