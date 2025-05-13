// Связка PinId и доски
export function savePinBoardLink(pin, boardName) {
  const links = JSON.parse(localStorage.getItem("pinBoardLinks") || "[]");

  const existingIndex = links.findIndex((link) => link.pinId === pin.id);

  if (existingIndex !== -1) {
    if (links[existingIndex].board !== boardName) {
      links[existingIndex].board = boardName;
    }
  } else {
    links.push({ pinId: pin.id, board: boardName });
  }

  if (pin.board !== boardName) {
    const pinElement = document.querySelector("#pin" + pin.id);
    pinElement.remove();
    pin.board = boardName;
  }

  localStorage.setItem("pinBoardLinks", JSON.stringify(links));
}

// Восстановить название доски по PinId
export function restorePinBoardLink(pinId) {
  const links = JSON.parse(localStorage.getItem("pinBoardLinks") || "[]");
  return links.find((link) => link.pinId === pinId)?.board || "Все";
}

// Получение пинов с MockAPI
export async function getPinsFromMockAPI() {
  try {
    const res = await fetch(
      "https://6811f5633ac96f7119a647e4.mockapi.io/PinterestClone/Api/pins"
    );
    if (!res.ok) throw new Error("Ошибка получения данных с MockAPI");
    return await res.json();
  } catch (e) {
    console.error("MockAPI ошибка получения:", e);
    return [];
  }
}
