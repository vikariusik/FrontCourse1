//import './app.scss'; // Global styles
import { createPin } from './pin/pin.js';
import { openBoardSelectModal } from './components/modal/modal.js'
import { getPinsFromMockAPI } from './components/Helper.js'

const pinGrid = document.querySelector('.pin-grid');

let pins = [];
let boards = [];

loadData();

async function loadData() {
  // Example using local data, replace with mockapi.io fetch
  pins = [
    {
      id: '1',
      image: '/src/pin/pin_media_example/main.jpg',
      description: 'Закат над морем',
      user: {
          name: 'Аня',
          avatar: '/src/pin/pin_media_example/avatar.png'
      }
    }
  ,
  {
    id: '2',
    image: '/src/pin/pin_media_example/main.jpg',
    description: 'Закат над морем2',
    user: {
        name: 'Аня',
        avatar: '/src/pin/pin_media_example/avatar.png'
    }
  }
  ];

  let pins2 = await getPinsFromMockAPI();

  pins = pins2.map(pin => ({
    id: pin.id,
    image: pin.img,
    description: pin.name,
    user: {
      name: pin.userName,
      avatar: pin.avatar
    }
  }));

  boards = ["default","My Board"];

  renderPins(pins);
}

function renderPins(pinData) {
  pinGrid.innerHTML = ''; // Clear existing pins
  pinData.forEach(pin => {
    const pinComponent = createPin(pin, boards, openBoardSelectModal);
    pinGrid.appendChild(pinComponent);
  });
}
