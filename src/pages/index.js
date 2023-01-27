import './index.css';
import { initialCards, settings } from '../scripts/constants.js';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';
//попапы
const popupEditProfile = document.querySelector('.popup_edite');
const popupAddPlace = document.querySelector('.popup_add');
const popupImg = document.querySelector('.popup_image');

//кнопки добавления
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//формы
const formElement = document.querySelector('.form_type_edit');
const formPlace = document.querySelector('.form_edit_place');

//инпуты
/* const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle'); */
const popupNameInput = document.querySelector('.form__input_item_name');
const popupInfoInput = document.querySelector('.form__input_item_job');
/* const popupLinkInput = document.querySelector('.form__input_item_link');
const popupPlaceInput = document.querySelector('.form__input_item_place'); */

const cardsItems = document.querySelector('.cards__item');

const userInfo = new UserInfo({
  profileName: '.profile__title',
  profileInfo: '.profile__subtitle'
});

const popupImage = new PopupWithImage(popupImg);

//открытие попапа с картинкой
function handleCardClick(name, link) {
  popupImage.open(name, link);
};

//добавление карточки
function createCard(item) {
  const card = new Card(item, '#card-template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement
}

function addCard(card) {
  section.addItem(card);
};

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    addCard(createCard(item));
  }
},
  cardsItems
);

//попап профиля
const popupProfile = new PopupWithForm({
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    formValidatorProfile.resetValidation();
  }
},
  popupEditProfile
);

profileEditButton.addEventListener('click', (e) => {
  e.preventDefault();

  popupNameInput.value = userInfo.getUserInfo().name;
  popupInfoInput.value = userInfo.getUserInfo().info;

  formValidatorProfile.resetValidation();
  popupProfile.open();
});

//попап места
const popupPlace = new PopupWithForm({
  handleFormSubmit: (item) => {
    const newCard = {
      name: item.place,
      link: item.link,
    };
    addCard(createCard(newCard));
  }
},
  popupAddPlace
);

profileAddButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formValidatorPlace.resetValidation();
  popupPlace.open();
});


//валидация
const formValidatorProfile = new FormValidator(settings, formElement);
const formValidatorPlace = new FormValidator(settings, formPlace);
formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();

//слушатели
popupImage.setEventListeners();
popupPlace.setEventListeners();
popupProfile.setEventListeners();


section.renderItems();


