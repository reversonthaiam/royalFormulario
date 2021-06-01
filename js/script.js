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

  const validateEmail = (event) => {
    const input = event.currentTarget;
    input.parentElement.classList.remove('show-invalido')
    input.parentElement.classList.remove('show-valido')
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = regex.test(input.value);
    if (!emailTest) {
      
      input.nextElementSibling.classList.add("error");
      input.parentElement.classList.add('show-invalido')
      return false;
    
    } else {
      input.parentElement.classList.add('show-valido')
      return true;
   
    }
  };

  const validaCpf = (event) => {


    const input = event.currentTarget;
    var cpf = input.value;
    cpf.toString();

    input.parentElement.classList.remove('show-invalido')
    input.parentElement.classList.remove('show-valido')




    if (typeof cpf !== "string"){
      input.parentElement.classList.add('show-invalido')
      return false
    } 

    cpf = cpf.replace(/[\s.-]*/gim, "");
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      input.parentElement.classList.add('show-invalido')
      return false;
    }
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;

    input.parentElement.classList.add('show-valido')
    return true;
  };

  const validateLength = (event) => {
    const input = event.currentTarget;
    input.parentElement.classList.remove('show-invalido')
    input.parentElement.classList.remove('show-valido')

    if (input.value.length < 8) {
      input.parentElement.classList.add('show-invalido')
      return false;
      
    } else {
      input.parentElement.classList.add('show-valido')
      return true;
      
    }
  };

  const validateOnly = (event) => {
    const input = event.target;
    input.parentElement.classList.remove('show-invalido')
    input.parentElement.classList.remove('show-valido')

    if(input.value.length > 3){
      input.parentElement.classList.add('show-valido') 
      return true
    } else {
      input.parentElement.classList.add('show-invalido')
      return false
    }
    
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
          response = validateEmail(event);
          console.log(response);
          break;

        case "cpf":        
          response = validaCpf(event);
          console.log(response);
          break;

        case "phone":
          response = validateLength(event);
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
