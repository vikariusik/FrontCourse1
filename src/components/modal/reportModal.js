// reportModal.js
export function openReportModal(pinId) {
    const modal = document.createElement('div');
    modal.classList.add('modal-overlay');
  
    modal.innerHTML = `
      <div class="modal">
        <h2>Пожаловаться</h2>
        <textarea id="report-text" placeholder="Опишите проблему..." rows="5"></textarea>
        <div class="modal-buttons">
          <button id="send-report">Отправить</button>
          <button id="cancel-modal">Отмена</button>
        </div>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    modal.querySelector("#cancel-modal").onclick = () => modal.remove();
  
    modal.querySelector("#send-report").onclick = () => {
      const text = document.getElementById("report-text").value.trim();
  
      if (!text) {
        alert("Пожалуйста, опишите проблему.");
        return;
      }
  
      console.log(`Жалоба на пин ${pinId}: ${text}`);
      // Здесь ты можешь отправить POST-запрос на сервер, если нужно
  
      modal.remove();
    };
  }
  