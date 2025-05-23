// Função de fazer o video dar play

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".desktop-video");
  const playBtn = document.querySelector(".custom-play");

  playBtn.addEventListener("click", () => {
    video.play();
    playBtn.style.display = "none";
  });

  video.addEventListener("pause", () => {
    playBtn.style.display = "";
  });

  video.addEventListener("play", () => {
    playBtn.style.display = "none";
  });
});

// Validação do email
// Api de validacao do HTML5
// https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Forms/Form_validation

var email = document.getElementById("email");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Por favor coloque um email valido");
  }
});

// Validação do name
var firstName = document.getElementById("firstname");
var lastName = document.getElementById("lastname");
var nameRegex = /^[A-Za-z]+$/;

function validateName(input) {
  var value = input.value;
  var isValid = value.length > 0 && nameRegex.test(value);
  if (!isValid) {
    input.setCustomValidity("Por favor digite um nome válido");
  }
}

firstName.addEventListener("input", function () {
  validateName(firstName);
});

lastName.addEventListener("input", function () {
  validateName(lastName);
});

// Função do botão do shop

const menuItems = document.querySelectorAll("#menu .menu-item");

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    menuItems.forEach((i) => i.classList.remove("shop-click"));
    this.classList.add("shop-click");
  });
});

// Função para aparecer e desaparecer o search no mobile

document.addEventListener("DOMContentLoaded", function () {
  const lupa = document.querySelector(".lupa");
  const searchInput = document.querySelector(".search-input-mobile");
  const wrapper = document.querySelector(".search-mobile-wrapper");

  function showInput() {
    lupa.style.display = "none";
    searchInput.style.display = "block";
    searchInput.focus();
  }

  function hideInput() {
    searchInput.style.display = "none";
    lupa.style.display = "block";
  }

  lupa.addEventListener("click", function (e) {
    showInput();
    e.stopPropagation();
  });

  document.addEventListener("click", function (e) {
    if (searchInput.style.display === "block" && !wrapper.contains(e.target)) {
      hideInput();
    }
  });

  searchInput.addEventListener("blur", function () {
    setTimeout(hideInput, 100);
  });
});
