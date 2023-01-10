import { initialCards, settings } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const popupEditProfile = document.querySelector('.popup_edite');
const popupAddPlace = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const formElement = document.querySelector('.form_type_edit');
const formPlace = document.querySelector('.form_edit_place');
const popupNameInput = document.querySelector('.form__input_item_name');
const popupInfoInput = document.querySelector('.form__input_item_job');
const profileAddButton = document.querySelector('.profile__add-button');

const cardsItems = document.querySelector('.cards__item');

const popupOpenedImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const popupLinkInput = document.querySelector('.form__input_item_link');
const popupPlaceInput = document.querySelector('.form__input_item_place');


const formValidatorProfile = new FormValidator(settings, formElement);
const formValidatorPlace = new FormValidator(settings, formPlace);


//закрытие попапа эскейпом
function handlePopupEsc(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupEsc);
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupEsc);
}

//кнопка открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
  popupNameInput.value = profileName.textContent;
  popupInfoInput.value = profileInfo.textContent;

  openPopup(popupEditProfile);
});

//Вставка инфы из попапа в профиль//
function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = popupNameInput.value;
  profileInfo.textContent = popupInfoInput.value;

  closePopup(popupEditProfile);
};

//кнопка открытия попапа добавления места
profileAddButton.addEventListener('click', () => {
  formValidatorPlace.resetValidation();
  openPopup(popupAddPlace);
});


//закрытие попапов//
const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
})

//попап закроется кликом по бэкграунду
const popupOverlay = document.querySelectorAll('.popup');

popupOverlay.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  })
});


//добавление карточки
function createCard(item) {
  const card = new Card(item, '#card-template', openImagePopup);
  const cardElement = card.generateCard();

  return cardElement
}

function addCard(title, image){
  cardsItems.prepend(createCard(title, image));
}

initialCards.forEach((item) => {
  addCard(item, cardsItems);
});


function submitPlaceForm(e) {
  e.preventDefault();

  const cardElement = {
    name: popupPlaceInput.value,
    link: popupLinkInput.value,
  };

  addCard(cardElement, cardsItems);
  closePopup(popupAddPlace);
  e.target.reset();
}

//открытие попапа с картинкой
function openImagePopup(name, link) {
  popupOpenedImage.src = link;
  popupOpenedImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}


formElement.addEventListener('submit', submitEditProfileForm);
formPlace.addEventListener('submit', submitPlaceForm);


formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();

