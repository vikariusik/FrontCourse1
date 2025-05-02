import { saveToLocalStorage, saveToMockAPI, savePinBoardLink } from '../Helper.js';

export function openModal(existingPin = null) {
  const modal = document.createElement('div');
  modal.classList.add('modal-overlay');

  modal.innerHTML = `
    <div class="modal">
      <h2>${existingPin ? 'Edit Pin' : 'Create Pin'}</h2>
      <input type="text" id="pin-title" placeholder="Title" value="${existingPin?.title || ''}">
      <input type="text" id="pin-image" placeholder="Image URL" value="${existingPin?.image || ''}">
      <textarea id="pin-description" placeholder="Description">${existingPin?.description || ''}</textarea>
      <div class="modal-buttons">
        <button id="save-pin">Save</button>
        <button id="cancel-modal">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancel-modal").onclick = () => modal.remove();

  modal.querySelector("#save-pin").onclick = async () => {
    const pin = {
      title: document.getElementById('pin-title').value,
      image: document.getElementById('pin-image').value,
      description: document.getElementById('pin-description').value,
    };

    saveToLocalStorage(pin);
    await saveToMockAPI(pin);

    modal.remove();
    location.reload();
  };
}

export function openBoardSelectModal(pinId) {
  const modal = document.createElement('div');
  modal.classList.add('modal-overlay');

  modal.innerHTML = `
    <div class="modal">
      <h2>Сохранить на доску</h2>
      <select id="board-select">
        <option value="Favorites">Favorites</option>
        <option value="Recipes">Recipes</option>
        <option value="Inspiration">Inspiration</option>
      </select>
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
