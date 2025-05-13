export function createPin(pinData, boardList = [], clickMenuAdd, clickMenuComplaint) {
    const pin = document.createElement('div');
    pin.className = 'pin';
    pin.id = 'pin' + pinData.id;

    pin.innerHTML = `
        <div class="image-wrapper">
            <img src="${pinData.image}" alt="photo" class="main-photo">
            <div class="actions">
                <button class="dots-btn" data-id="${pinData.id}">&#8230;</button>
                <div class="opened-menu hidden">
                    <div class="menu-item" id="menu-add-to-board">Добавить на доску</div>
                    <div class="menu-item" id="menu-complaint">Пожаловаться</div>
                </div>
            </div>
        </div>
        <div class="user-info">
            <img src="${pinData.user.avatar}" alt="person-photo" class="avatar">
            <span>${pinData.description}</span>
        </div>
    `;

    const photo = pin.querySelector('.main-photo')
    photo.addEventListener('error', function() { 
        this.onerror = null;
        this.src = 'https://german-shepherd-dog-breed.ru/images/stories/virtuemart/product/izobrazhenie-vremenno-nedostupno.jpg';
    })

    // Обработчик для кнопки с тремя точками 
    const dotsBtn = pin.querySelector('.dots-btn')
    const openedMenu = pin.querySelector('.opened-menu');

    dotsBtn.addEventListener('click', (el) => {
        el.stopPropagation();
        openedMenu.classList.toggle('hidden');
        // Можно добавить код для открытия модального окна
    });

   const menuAdd = pin.querySelector("#menu-add-to-board");
   menuAdd.addEventListener('click', () => {
    clickMenuAdd(pinData, boardList)
});

   const menuComplaint = pin.querySelector("#menu-complaint");
   menuComplaint.addEventListener('click', () => clickMenuComplaint(pinData.id));

    document.addEventListener('click', () => {
        openedMenu.classList.add('hidden');
    });

    return pin;
}

