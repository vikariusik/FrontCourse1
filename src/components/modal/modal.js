import { savePinBoardLink } from '../Helper.js';

// === МОДАЛКА: Сохранить пин на доску ===
export function openBoardSelectModal(pinId, boardList = []) {
  const modal = document.createElement('div');
  modal.classList.add('modal-overlay');

  const optionsHtml = boardList.map(
    board => `<option value="${board}">${board}</option>`
  ).join('');

  modal.innerHTML = `
    <div class="modal">
      <h2>Сохранить на доску</h2>
      <select id="board-select">${optionsHtml}</select>
      <div class="modal-buttons">
        <button id="save-board">Сохранить</button>
        <button id="cancel-modal">Отмена</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancel-modal").onclick = () => modal.remove();

  modal.querySelector("#save-board").onclick = () => {
    const boardName = document.getElementById('board-select').value;
    savePinBoardLink(pinId, boardName);
    modal.remove();
  };
}
