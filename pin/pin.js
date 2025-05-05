const pinsContainer = document.getElementById('pinsContainer');

function createPin({ id, image, user, description }) {
    const pin = document.createElement('div');
    pin.className = 'pin';

    pin.innerHTML = `
        <div class="image-wrapper">
            <img src="${image}" alt="photo" class="main-photo">
            <div class="actions">
                <button class="dots-btn" data-id="${id}">&#8230;</button>
                <div class="opened-menu hidden">
                    <div class="menu-item">Добавить на доску</div>
                    <div class="menu-item">Пожаловаться</div>
                </div>
            </div>
        </div>
        <div class="user-info">
            <img src="${user.avatar}" alt="person-photo" class="avatar">
            <span>${description}</span>
        </div>
    `;

    // Обработчик для кнопки с тремя точками 
    const dotsBtn = pin.querySelector('.dots-btn')
    const openedMenu = pin.querySelector('.opened-menu');

    dotsBtn.addEventListener('click', (el) => {
        el.stopPropagation();
        openedMenu.classList.toggle('hidden');
        // Можно добавить код для открытия модального окна
    });

    document.addEventListener('click', () => {
        openedMenu.classList.add('hidden');
    });

    return pin;
}
export { createPin };

// Пример (фото добавила свои, потому что по-другому ничего не отображалось)
const mockPinData = {
    id: '1',
    image: 'pin_media_example/main.jpg',
    description: 'Закат над морем',
    user: {
        name: 'Аня',
        avatar: 'pin_media_example/avatar.png'
    }
};


// Добавляем (тут не до конца уверена)
pinsContainer.appendChild(createPin(mockPinData));
