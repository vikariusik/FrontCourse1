// LocalStorage
export function saveToLocalStorage(pin) {
  const pins = JSON.parse(localStorage.getItem('pins') || '[]');
  pins.push({ ...pin, id: Date.now() });
  localStorage.setItem('pins', JSON.stringify(pins));
}

// Связка PinId и доски
export function savePinBoardLink(pinId, boardName) {
  const links = JSON.parse(localStorage.getItem('pinBoardLinks') || '[]');
  links.push({ pinId, board: boardName });
  localStorage.setItem('pinBoardLinks', JSON.stringify(links));
}

export function getBoardForPin(pinId) {
  const links = JSON.parse(localStorage.getItem('pinBoardLinks') || '[]');
  return links.find(link => link.pinId === pinId)?.board || null;
}

// MockAPI (подставь свою ссылку!)
export async function saveToMockAPI(pin) {
  try {
    const res = await fetch("https://6811f5633ac96f7119a647e4.mockapi.io/PinterestClone/Api/pins", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pin)
    });

    if (!res.ok) throw new Error("Ошибка сохранения на сервере");
    console.log("Сохранено на MockAPI:", await res.json());
  } catch (e) {
    console.error("MockAPI ошибка:", e);
  }
}
