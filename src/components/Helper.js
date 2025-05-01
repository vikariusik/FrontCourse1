// LocalStorage
export function saveToLocalStorage(pin) {
    const pins = JSON.parse(localStorage.getItem('pins') || '[]');
    pins.push({ ...pin, id: Date.now() });
    localStorage.setItem('pins', JSON.stringify(pins));
  }
  
  
  export async function saveToMockAPI(pin) {
  try {
    const res = await fetch("https://6811f5633ac96f7119a647e4.mockapi.io/PinterestClone/Api/pins", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pin)
    });

    if (!res.ok) throw new Error("Ошибка сохранения на сервере");

    const result = await res.json();
    console.log("Сохранено на MockAPI:", result);
  } catch (e) {
    console.error("MockAPI ошибка:", e);
  }
}
