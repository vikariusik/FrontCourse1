import { createPin } from "./pin/pin.js";
import { openBoardSelectModal } from "./components/modal/modal.js";
import { openReportModal } from "./components/modal/reportModal.js";
import { getPinsFromMockAPI, restorePinBoardLink } from "./components/Helper.js";

// DOM-элементы
const pinsContainer = document.getElementById("pinsContainer");
const searchInput = document.getElementById("searchInput");
const boardsBtn = document.getElementById("boardsBtn");
const boardsDropdown = document.getElementById("boardsDropdown");

// Список досок
const boardList = ["Все", "Избранное", "Работа", "Путешествия"];

// Пины

let pins = [];

async function loadData() {
  let pins2 = await getPinsFromMockAPI();

  pins = pins2.map((pin) => ({
    id: pin.id,
    image: pin.img,
    description: pin.name,
    user: {
      name: pin.userName,
      avatar: pin.avatar,
    },
    board: restorePinBoardLink(pin.id), 
  }));

  renderPins(pins);
}

// Рендер всех пинов
function renderPins(pinList) {
  pinsContainer.innerHTML = "";
  pinList.forEach((pin) => {
    const pinEl = createPin(
      pin,
      boardList,
      openBoardSelectModal,
      openReportModal
    );
    pinsContainer.appendChild(pinEl);
  });
}

// Спиннер
function showSpinner() {
  spinner.classList.remove("hidden");
}

function hideSpinner() {
  spinner.classList.add("hidden");
}

// Дебаунс
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    showSpinner();
    timeout = setTimeout(() => {
      func(...args);
      hideSpinner();
    }, delay);
  };
}

// Поиск
function searchPins(query) {
  const filtered = pins.filter((pin) =>
    pin.description.toLowerCase().includes(query.toLowerCase())
  );
  renderPins(filtered);
}

const debouncedSearch = debounce((query) => {
  if (query.trim()) {
    searchPins(query);
  } else {
    renderPins(pins);
  }
}, 1000);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

// Клик по логотипу — сброс
const logo = document.getElementById("logo");
logo.addEventListener("click", (e) => {
  e.preventDefault();
  searchInput.value = "";
  renderPins(pins);
});

// Выпадающее меню
boardsBtn.addEventListener("click", (e) => {
  boardsDropdown.classList.toggle("hidden");
  e.stopPropagation();
});

// Закрытие меню при клике вне
document.addEventListener("click", (e) => {
  if (!boardsDropdown.classList.contains("hidden")) {
    boardsDropdown.classList.add("hidden");
  }
});

// Добавление пунктов меню
boardList.forEach((board) => {
  const item = document.createElement("div");
  item.className = "boards__dropdown-item";
  item.textContent = board;
  item.addEventListener("click", (e) => {
    e.stopPropagation();
    if (board === "Все") {
      renderPins(pins);
    } else {
      const filtered = pins.filter((pin) => pin.board === board);
      renderPins(filtered);
    }
    boardsDropdown.classList.add("hidden");
  });
  boardsDropdown.appendChild(item);
});

// Загрузка
loadData();


/*//При клике на логотип "Pinterest" возвращаться на главную
const logo = document.getElementById("logo");

logo.addEventListener("click", (e) => {
  e.preventDefault();
  renderPins(pins); // Показываем все пины
  searchInput.value = ""; // Очищаем поиск
});

// Поиск по хэштегу
function searchPins(query) {
  const filtered = pins.filter((pin) =>
    pin.description.toLowerCase().includes(query.toLowerCase())
  );
  renderPins(filtered);
}

// Обработчики событий
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const value = searchInput.value.trim();
    if (value) {
      searchPins(value);
    } else {
      renderPins(pins);
    }
  }
});

boardsBtn.addEventListener("click", () => {
  boardsDropdown.classList.toggle("hidden");
});

// Заполнение списка досок
boardList.forEach((board) => {
  const item = document.createElement("div");
  item.className = "boards__dropdown-item";
  item.textContent = board;
  item.addEventListener("click", () => {
    const filtered = pins.filter((pin) => pin.board === board);
    renderPins(filtered);
    boardsDropdown.classList.add("hidden");
  });
  boardsDropdown.appendChild(item);
});

// Начальная загрузка
loadData();
*/