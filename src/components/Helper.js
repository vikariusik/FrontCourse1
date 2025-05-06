// Связка PinId и доски
export function savePinBoardLink(pinId, boardName) {
  const links = JSON.parse(localStorage.getItem('pinBoardLinks') || '[]');
  links.push({ pinId, board: boardName });
  localStorage.setItem('pinBoardLinks', JSON.stringify(links));
}

// Восстановить название доски по PinId
export function RestorePinBoardLink(pinId) {
  const links = JSON.parse(localStorage.getItem('pinBoardLinks') || '[]');
  return links.find(link => link.pinId === pinId)?.board || null;
}

// Получение пинов с MockAPI
export async function getPinsFromMockAPI() {
  try {
    const res = await fetch("https://6811f5633ac96f7119a647e4.mockapi.io/PinterestClone/Api/pins");
    if (!res.ok) throw new Error("Ошибка получения данных с MockAPI");
    return await res.json();
  } catch (e) {
    console.error("MockAPI ошибка получения:", e);
    return [];
  }
}
