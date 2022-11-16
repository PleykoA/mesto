const popUp = document.querySelector('.popup');
const popUpEdite = document.querySelector('.popup-edite');
const popUpAdd = document.querySelector('.popup-add');
const popUpImage = document.querySelector('.popup-image');
const closeButton = document.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__edit');
const nameInput = document.querySelector('.popup__input_item_name');
const jobInput = document.querySelector('.popup__input_item_job');
const addBtn = document.querySelector('.profile__add-button');
const placeInfo = document.querySelector('.card__title');
const popUpImageOpen = document.querySelector('.card__image');


//добавление лайка//

document.addEventListener("click", ({ target }) => {
  const likeBtn = target.closest(".card__like")

  if (!likeBtn) return;
  likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
  likeBtn.ariaLabel = aria.label[likeBtn.ariaPressed];
})
  ;


//open попап изменения профиля//
editButton.addEventListener('click', function () {
  popUpEdite.classList.add('popup_opened');
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;
});

/*function closePopUp() {
  popUp.classList.remove('popup_opened');
};
*/

//Открытие попапа добавления картинки//
addBtn.addEventListener('click', function () {
  popUpAdd.classList.add('popup_opened');
});


//закрытие попапов//
function closePopUp() {
  this.closest('.popup').style.display = 'none';
}

let elements = document.querySelectorAll('.popup__close-button');

for (let e of elements) {
  e.addEventListener('click', closePopUp);
}


//Открытие попапа самой картинки//


/*//попап закроется по клику по бэкграунду
popUp.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    popUp.classList.remove('opened');
  }
});*/



function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;

  closePopUp();
};

closeButton.addEventListener('click', closePopUp);

formElement.addEventListener('submit', formSubmitHandler);


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#cards-template').content;

const cardInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  cardInfo.forEach(renderCard);
}

function renderCard({ name, link }) {
  const cardsElement = cardsTemplate.querySelector('.card').cloneNode(true);
  cardsElement.querySelector('.card__title').textContent = name;
  cardsElement.querySelector('.card__image').src = link;

  cardsContainer.prepend(cardsElement);
}

render();


//добавление карточки//


//Удаление карточки//
const deliteBtn = document.querySelectorAll('.card__delite');
deliteBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const cartItem = btn.closest('.card');
        cartItem.parentNode.removeChild(cartItem);
    });
});

//анимация корзины (я просто решила попробовать)//
const cardDeliteBtn = document.querySelector('.card__delite_button-head')
const deliteBtnBasket = document.querySelector('.card__delite')
deliteBtnBasket.addEventListener('mousedown', function () {
  cardDeliteBtn.classList.add('active');
});

deliteBtnBasket.addEventListener('mouseup', function () {
  cardDeliteBtn.classList.remove('active');
});

