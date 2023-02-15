import './index.css';
import { configApi, settings, profileEditButton, profileAddButton, profileEditAvatarButton, formElement, formPlace, formAvatar, popupNameInput, popupInfoInput, cardsItems, avatarInput } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';


const popupImage = new PopupWithImage('.popup_image');
const popupDelete = new PopupWithConfirmation('.popup_delete');

const api = new Api(configApi);

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([user, card]) => {
    userInfo.setUserInfo(user.name, user.about, user._id);
    userInfo.setUserAvatar(user.avatar);
    section.renderItems(card);
  })
  .catch((err) => {
    console.log(err);
  });


//добавление карточки
function createCard(item) {
  const userId = userInfo.getUserInfo().id;
  const card = new Card(
    item,
    '#card-template',
    userId,
    {
      handleCardClick,
      handleDeleteCard,
      handleLikeCard: (card) => {
        if (!card.likedCard()) {
          return api
            .likeCard(card._id)
            .then((res) => {
              card.toggleLikeCard();
              card.setLikesCount(res.likes);
              console.log(res.likes);
            })
            .catch((err) => console.log(err));
        } else {
          return api
            .removeLikeCard(card._id)
            .then((res) => {
              card.toggleLikeCard()
              card.setLikesCount(res.likes)
            })
            .catch((err) => { console.log(err) })
        }
      }
    }
  )
  const cardElement = card.generateCard();

  return cardElement
}

const section = new Section({
  renderer: (item) => createCard(item)
}, cardsItems);


//открытие попапа с картинкой
function handleCardClick(text, image) {
  popupImage.open(text, image);
};


//удаление карточки
function handleDeleteCard(card) {
  popupDelete.open(card);
  popupDelete.setCallback(() => {
    return api
      .deleteCard(card._id)
      .then(() => {
        card.deleteCard();
        popupDelete.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const userInfo = new UserInfo({
  profileName: '.profile__title',
  profileInfo: '.profile__subtitle',
  profileAvatar: '.profile__avatar'
});

//попап аватара
const popupAvatar = new PopupWithForm({
  submit: (data) => {
    popupAvatar.isLoading(true)
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.isLoading(false)
      })
  }
}, '.popup_avatar');

//попап профиля
const popupProfile = new PopupWithForm({
  submit: (inputs) => {
    popupProfile.isLoading(true)
    api.editProfile(inputs)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.isLoading(false)
      })
  }
}, '.popup_edite');

//попап изменения места(добавления карточки)
const popupPlace = new PopupWithForm({
  submit: (data) => {
    const card = {
      name: data.place,
      link: data.link,
    };
    popupPlace.isLoading(true)
    api
      .addCard(card)
      .then((res) => {
        section.addItem(createCard(res));
        popupPlace.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupPlace.isLoading(false)
      })
  }
}, '.popup_add');

//открытие попапа профиля
profileEditButton.addEventListener('click', (e) => {
  e.preventDefault();

  popupNameInput.value = userInfo.getUserInfo().name;
  popupInfoInput.value = userInfo.getUserInfo().info;

  formValidatorProfile.resetValidation();
  popupProfile.open();
});

//открытие попапа добавления карточки/места
profileAddButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formValidatorPlace.resetValidation();
  popupPlace.open();
});

//открытие попапа изменения аватара
profileEditAvatarButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  avatarInput.value = userInfo.getUserAvatar().avatar;
  formValidatorAvatar.resetValidation();
  popupAvatar.open();
});


//валидация
const formValidatorProfile = new FormValidator(settings, formElement);
const formValidatorPlace = new FormValidator(settings, formPlace);
const formValidatorAvatar = new FormValidator(settings, formAvatar);
formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorAvatar.enableValidation();

//слушатели
popupImage.setEventListeners();
popupPlace.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();





