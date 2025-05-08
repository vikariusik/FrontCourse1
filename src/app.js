import { createPin } from "./pin/pin.js";
import { openBoardSelectModal } from "./components/modal/modal.js";
import { openReportModal } from "./components/modal/reportModal.js";
import { getPinsFromMockAPI } from "./components/Helper.js";

// DOM-элементы
const pinsContainer = document.getElementById("pinsContainer");
const searchInput = document.getElementById("searchInput");
const boardsBtn = document.getElementById("boardsBtn");
const boardsDropdown = document.getElementById("boardsDropdown");

// Список досок
const boardList = ["Избранное", "Работа", "Путешествия"];

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
  boardsDropdown.appendChild(item);
});

// Начальная загрузка
loadData();
