const popUp = document.querySelectorAll('.popup');
const popUpEdite = document.querySelector('.popup_edite');
const popUpAdd = document.querySelector('.popup_add');
const ImgPopup = document.querySelector('.popup_image');

const editButton = document.querySelector('.profile__edit-button');
const nameInfo = document.querySelector('.profile__title');
const jobInfo = document.querySelector('.profile__subtitle');

const formElement = document.querySelector('.popup__edit');
const formPlace = document.querySelector('.popup__edit-place');
const nameInput = document.querySelector('.popup__input_item_name');
const jobInput = document.querySelector('.popup__input_item_job');
const addBtn = document.querySelector('.profile__add-button');

const cardsItems = document.querySelector('.cards__item');

const popUpImg = document.querySelector('.popup__image');
const captionPopUp = document.querySelector('.popup__caption');


const linkInput = document.querySelector('.popup__input_item_link');
const placeInput = document.querySelector('.popup__input_item_place');

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


//добавление лайка//

document.addEventListener("click", ({ target }) => {
  const likeBtn = target.closest(".card__like")

  if (!likeBtn) return;
  likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
  likeBtn.ariaLabel = [likeBtn.ariaPressed];
});


//открытие попапов
function openPopUp(popup) {
  popup.classList.add('popup_opened');
}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
}

//кнопка открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  openPopUp(popUpEdite);
});

//кнопка открытия попапа добавления места
addBtn.addEventListener('click', () => {
  openPopUp(popUpAdd);
});

//закрытие попапов//
const closeBtn = document.querySelectorAll('.popup__close-button');

closeBtn.forEach((closeBtn) => {
  const popup = closeBtn.closest('.popup');
  closeBtn.addEventListener('click', () => closePopUp(popup));
})


//инфа в форме редактирования профиля
function EditForm() {
  nameInput.value = nameInfo.textContent;
  jobInput.value = jobInfo.textContent;

}

//попап закроется по клику по бэкграунду
/*popUp.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    popUp.classList.remove('popup_opened');
  }
});*/


//Вставка инфы из попапа в профиль//
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;

  closePopUp(popUpEdite);
};

//работа с шаблоном//
 function CardInfo() {
  const cardTemplate = document.querySelector('#card-template').content;
  return cardTemplate.cloneNode(true);
}
;

function generateCard(cardItem, cardLink, cardName) {
  const cardImg = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardImg.setAttribute('src', cardLink);
  cardImg.setAttribute('alt', cardName);
  cardTitle.textContent = cardName;

  //удаление карточки
  const dltbtn = cardItem.querySelector('.card__delete');
  dltbtn.addEventListener('click', () => {
    dltbtn.closest('li').remove()
  }
  );

  //открытие попапа с картинкой//
  cardImg.addEventListener('click', () => {
    popUpImg.src = cardImg.src;
    popUpImg.alt = cardImg.alt;
    captionPopUp.textContent = cardTitle.textContent;
    openPopUp(ImgPopup);
  }
  );
}

function createCard(cardLink, cardName) {
  const card = CardInfo();
  generateCard(card, cardLink, cardName);
  return card;
}

function addCard(cardItem) {
  cardsItems.prepend(cardItem);
};


//закрытие попапа с картинкой//
const ImgCloseBtn = document.querySelector('.popup__close-button-image')
ImgCloseBtn.addEventListener('click', () => {
  closePopUp(ImgPopup);
});

//добавление карточек из массива
initialCards.forEach((initialCard) => {
  const newCards = createCard(initialCard.link, initialCard.name);
  addCard(newCards);
});

//инфа для новой карточки//
function handleAddSubmit(e) {
  e.preventDefault();

  const newCard = createCard(linkInput.value, placeInput.value)
  addCard(newCard);
  closePopUp(popUpAdd);
  formPlace.reset();
};


formPlace.addEventListener('submit', handleAddSubmit);
formElement.addEventListener('submit', formSubmitHandler);
