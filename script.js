// Função de fazer o video dar play

document.addEventListener("DOMContentLoaded", () => {
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

// Validação dos forms
// Api de validacao do HTML5 para o email
// https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Extensions/Forms/Form_validation

// Validação do name
var firstName = document.getElementById("firstname");
var lastName = document.getElementById("lastname");
var nameRegex = /^[A-Za-z]+$/;

function validateName(input) {
  var value = input.value;
  var isValid = value.length > 0 && nameRegex.test(value);
  if (!isValid) {
    input.setCustomValidity("Por favor digite um nome válido");
  } else {
    input.setCustomValidity("");
  }
}

if (firstName) {
  firstName.addEventListener("input", () => {
    validateName(firstName);
  });
}

if (lastName) {
  lastName.addEventListener("input", () => {
    validateName(lastName);
  });
}

// Validação do email
var email = document.getElementById("email");

if (email) {
  email.addEventListener("input", (event) => {
    if (email.validity.typeMismatch) {
      email.setCustomValidity("Por favor coloque um email valido");
    } else {
      email.setCustomValidity("");
    }
  });
}

// validação do email do subscribe
var emailNews = document.getElementById("emailnews");
if (emailNews) {
  emailNews.addEventListener("input", () => {
    if (emailNews.validity.typeMismatch) {
      emailNews.setCustomValidity("Por favor coloque um email válido");
    } else {
      emailNews.setCustomValidity("");
    }
  });
}

// Função para aparecer e desaparecer o search no mobile

document.addEventListener("DOMContentLoaded", () => {
  const lupa = document.querySelector(".lupa");
  const searchBar = document.querySelector(".search-bar");
  const searchInput = document.querySelector(".search-input");

  lupa.addEventListener("click", (e) => {
    searchBar.classList.add("active");
    searchInput.focus();
    e.stopPropagation();
  });

  document.addEventListener("click", (e) => {
    if (
      searchBar.classList.contains("active") &&
      !searchBar.contains(e.target)
    ) {
      searchBar.classList.remove("active");
    }
  });

  searchInput.addEventListener("blur", () => {
    setTimeout(() => searchBar.classList.remove("active"), 100);
  });
});
// DROPDOWN MENU

document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.closest("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = isDropdownButton.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

// Função de card shops por categorias +
// Função de random nas categorias

// Variaveis para controlar se esta mostrando tudo, e variavel para guardar o ultimo type utilizdo
let showingAll = false;
let lastType = "random";

function showProduct(type, showAll = false) {
  const cards = document.querySelectorAll(".product-card");
  let visibleCount = 0;
  lastType = type;
  showingAll = showAll;

  // Esconde todos os cards primeiro para resetar o container dos cards
  cards.forEach((card) => {
    card.style.display = "none";
  });

  //  Função de random para os types, limitando a 2 no mobile e 3 no dekstop
  if (type === "random") {
    const cardsArr = Array.from(cards);
    const shuffled = cardsArr.sort(() => 0.5 - Math.random());
    const limit = window.innerWidth < 769 ? 2 : 3;
    const maxToShow = showAll ? shuffled.length : limit;
    shuffled.slice(0, maxToShow).forEach((card) => {
      card.style.display = "flex";
      visibleCount++;
    });
  } else {
    // Mostra cards das categorias fazendo funcionar também quando tem mais de uma categoria e limitando 2 no mobile
    cards.forEach((card) => {
      const types = (card.dataset.type || "").split(" ");
      if (type === "all" || types.includes(type)) {
        if (window.innerWidth < 769 && !showAll && visibleCount < 2) {
          card.style.display = "flex";
          visibleCount++;
        }
        // Se for clicado no show more mostra todos os items pois so temos 5
        if (window.innerWidth >= 769 && (showAll || visibleCount < 3)) {
          card.style.display = "flex";
          visibleCount++;
        }

        if (showAll) {
          card.style.display = "flex";
        }
      }
    });
  }

  // Cria a mensagem de nenhum produto na categoria e confere se ela ja foi criada no documento para nao mostrar 2 vvezes
  let noProductsMsg = document.getElementById("no-products-msg");
  if (!noProductsMsg) {
    noProductsMsg = document.createElement("div");
    noProductsMsg.id = "no-products-msg";
    noProductsMsg.textContent =
      "Nenhum produto encontrado para esta categoria.";
    noProductsMsg.style.display = "none";
    noProductsMsg.style.textAlign = "center";
    noProductsMsg.style.margin = "32px 0";
    document.querySelector(".product-img-container").appendChild(noProductsMsg);
  }
  noProductsMsg.style.display = visibleCount === 0 ? "block" : "none";

  // Retira o botao de view more quando aparece todos os itens
  const viewMoreBtn = document.getElementById("view-more-btn");
  if (
    window.innerWidth >= 769 &&
    !showAll &&
    visibleCount > 0 &&
    visibleCount < cards.length
  ) {
    viewMoreBtn.style.display = "inline-block";
  } else {
    viewMoreBtn.style.display = "none";
  }
}

// Faz as imagens iniciais serem randomizadas
function showRandomCardsOnLoad() {
  showProduct("random");
}

function handleInitialCards() {
  showRandomCardsOnLoad();
}

window.addEventListener("DOMContentLoaded", handleInitialCards);

// Função para funcionar o botao do viewmore
document.addEventListener("DOMContentLoaded", function () {
  const viewMoreBtn = document.getElementById("view-more-btn");
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener("click", function () {
      showProduct(lastType, true);
    });
  }
});

// Funcao para funcionar os produtos e também adcionar o shop-click que é o meu design do botao que esta no css
const menuItems = document.querySelectorAll("#menu .menu-item");
menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    menuItems.forEach((i) => i.classList.remove("shop-click"));
    this.classList.add("shop-click");
    const type = this.textContent.trim().toLowerCase();
    if (type === "random") {
      showProduct("random");
    } else if (type === "cat") {
      showProduct("cat");
    } else if (type === "dogs") {
      showProduct("dog");
    } else if (type === "fish") {
      showProduct("fish");
    } else if (type === "birds") {
      showProduct("birds");
    } else {
      showProduct("all");
    }
  });
});
