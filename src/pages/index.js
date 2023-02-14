import './index.css';
import { configApi, settings, profileEditButton, profileAddButton, profileEditAvatarButton, formElement, formPlace, formAvatar, popupNameInput, popupInfoInput, cardsItems } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
/* const cards = document.querySelector('.cards'); */
const avatarInput = document.querySelector('.form__input_link_avatar');

const popupImage = new PopupWithImage('.popup_image');
const popupDelete = new PopupWithConfirmation('.popup_delete');
const api = new Api(configApi);

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then((res) => {
    userInfo.setUserInfo(res[0].name, res[0].about, res[0]._id);
    userInfo.setUserAvatar(res[0].avatar);
    section.renderItems(res[1]);
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
      handleCardDelete,
      handleLikeClick
    })
  const cardElement = card.generateCard();

  return cardElement
}

const section = new Section({
  renderer: (item) => createCard(item)
}, cardsItems);


function handleLikeClick(card) {
  return api
    .likeCard(card._id)
    .then((res) => {
      card.toggleLike();
      card.setLikes(res.likes);
    })
    .catch((err) => console.log(err));
}

function handleCardClick(text, image) {
  popupImage.open(text, image);
};

function handleCardDelete(card) {
  popupDelete.open(card);
  popupDelete.sendConfirmation(() => {
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


const popupAvatar = new PopupWithForm({
  handleFormSubmit: (data) => {
    popupAvatar.rendererLoading(true)
    api
      .updateAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.rendererLoading(false)
      })
  }
}, '.popup_avatar');


const popupProfile = new PopupWithForm({
  handleFormSubmit: (inputs) => {
    popupProfile.rendererLoading(true)
    api.editProfile(inputs)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        popupProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.rendererLoading(false)
      })
  }
}, '.popup_edite');

const popupPlace = new PopupWithForm({
  handleFormSubmit: (data) => {
    const itemCard = {
      name: data.place,
      link: data.link,
    };
    popupPlace.rendererLoading(true)
    api
      .addCard(itemCard)
      .then((res) => {
        section.addItem(createCard(res));
        popupPlace.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupPlace.rendererLoading(false)
      })
  }
}, '.popup_add');



function handleSubmitProfile() {
  popupNameInput.value = userInfo.getUserInfo().name;
  popupInfoInput.value = userInfo.getUserInfo().info;
}


profileEditButton.addEventListener('click', (e) => {
  e.preventDefault();
  const userData = userInfo.getUserInfo()
  handleSubmitProfile(userData);

  formValidatorProfile.resetValidation();
  popupProfile.open();
});


profileAddButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  formValidatorPlace.resetValidation();
  popupPlace.open();
});

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





