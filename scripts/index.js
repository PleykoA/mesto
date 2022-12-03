import { initialCards } from "./constants.js";

const popupEditProfile = document.querySelector('.popup_edite');
const popupAddPlace = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const formElement = document.querySelector('.form_type_edit');
const formPlace = document.querySelector('.form__edit_place');
const popupNameInput = document.querySelector('.form__input_item_name');
const popupInfoInput = document.querySelector('.form__input_item_job');
const profileAddButton = document.querySelector('.profile__add-button');

const cardsItems = document.querySelector('.cards__item');

const popupOpenedImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const popupLinkInput = document.querySelector('.form__input_item_link');
const popupPlaceInput = document.querySelector('.form__input_item_place');

const cardTemplate = document.querySelector('#card-template').content;

//закрытие попапа эскейпом
function handlePopupEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
//добавление лайка//
const likedCard = (event) => {
  event.target.closest('.card__like').classList.toggle('active');
}

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupEsc);
}
//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', handlePopupEsc);
}

//кнопка открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  popupNameInput.value = profileName.textContent;
  popupInfoInput.value = profileInfo.textContent;
});

//кнопка открытия попапа добавления места
profileAddButton.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

//закрытие попапов//
const popupCloseBtns = document.querySelectorAll('.popup__close-button');

popupCloseBtns.forEach((closeBtns) => {
  const popup = closeBtns.closest('.popup');
  closeBtns.addEventListener('click', () => closePopup(popup));
});

//попап закроется кликом по бэкграунду
const popupOverlay = document.querySelectorAll('.popup');

popupOverlay.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  })
});

//Вставка инфы из попапа в профиль//
function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = popupNameInput.value;
  profileInfo.textContent = popupInfoInput.value;

  closePopup(popupEditProfile);
};

//работа с шаблоном//
function createCard(cardLink, cardName) {
  const card = cardTemplate.cloneNode(true);;
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', cardName);
  cardTitle.textContent = cardName;

  //лайк карточки
  const likeBtn = card.querySelector('.card__like');
  likeBtn.addEventListener('click', likedCard);

  //удаление карточки
  const deleteCardButton = card.querySelector('.card__delete');
  deleteCardButton.addEventListener('click', () => {
    deleteCardButton.closest('.card').remove()
  }
  );

  //открытие попапа с картинкой//
  cardImage.addEventListener('click', () => {
    popupOpenedImage.src = cardImage.src;
    popupOpenedImage.alt = cardImage.alt;
    popupImageCaption.textContent = cardTitle.textContent;
    openPopup(popupImage);
  }
  );
  return card;
}

function addCard(card) {
  cardsItems.prepend(card);
};


//добавление карточек из массива
initialCards.forEach((initialCard) => {
  const сards = createCard(initialCard.link, initialCard.name);
  addCard(сards);
});

//инфа для новой карточки//
function submitPlaceForm(e) {
  e.preventDefault();

  const newCard = createCard(popupLinkInput.value, popupPlaceInput.value)
  addCard(newCard);
  closePopup(popupAddPlace);
  formPlace.reset();
};



formPlace.addEventListener('submit', submitPlaceForm);
formElement.addEventListener('submit', submitEditProfileForm);

