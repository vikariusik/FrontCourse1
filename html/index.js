import { createPin } from './pin.js';
import { openBoardSelectModal } from './modal.js';
import { openReportModal } from './reportModal.js';

// DOM-элементы
const pinsContainer = document.getElementById('pinsContainer');
const searchInput = document.getElementById('searchInput');
const boardsBtn = document.getElementById('boardsBtn');
const boardsDropdown = document.getElementById('boardsDropdown');

// Список досок
const boardList = ['Избранное', 'Работа', 'Путешествия'];

// Пины
const pins = [
  {
    id: '1',
    image: 'pin_media_example/main.jpg',
    description: '#природа Закат над морем',
    user: { name: 'Аня', avatar: 'pin_media_example/avatar.png' }
  },
  {
    id: '2',
    image: 'pin_media_example/main.jpg',
    description: '#море Закат над морем2',
    user: { name: 'Аня', avatar: 'pin_media_example/avatar.png' }
  }
];

// Рендер всех пинов
function renderPins(pinList) {
  pinsContainer.innerHTML = '';
  pinList.forEach(pin => {
    const pinEl = createPin(pin, boardList, openBoardSelectModal, openReportModal);
    pinsContainer.appendChild(pinEl);
  });
}

// Поиск по хэштегу
function searchPins(query) {
  const filtered = pins.filter(pin => pin.description.toLowerCase().includes(`#${query.toLowerCase()}`));
  renderPins(filtered);
}

// Обработчики событий
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const value = searchInput.value.trim();
    if (value) {
      searchPins(value);
    } else {
      renderPins(pins);
    }
  }
});

boardsBtn.addEventListener('click', () => {
  boardsDropdown.classList.toggle('hidden');
});

// Заполнение списка досок
boardList.forEach(board => {
  const item = document.createElement('div');
  item.className = 'boards__dropdown-item';
  item.textContent = board;
  boardsDropdown.appendChild(item);
});

// Начальная отрисовка
renderPins(pins);
