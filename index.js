const doc = document;
const log = console.log;
let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button')
let editButton = document.querySelector('.profile__edit-button');
let nameInfo = document.querySelector('.profile__title');
let jobInfo = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__edit');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_info');
let saveInfo = formElement.querySelector('.popup__save-button');


doc.addEventListener("click", ({ target }) => {
  const likeBtn = target.closest(".element__like")

  if (!likeBtn) return;
  likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
  likeBtn.ariaLabel = aria.label[likeBtn.ariaPressed];
})
  ;

//открытие попапа
editButton.addEventListener('click', function () {
  popUp.classList.add('opened');
})

closeButton.addEventListener('click', function () {
  popUp.classList.remove('opened');
})

//попап закроется по клику по бэкграунду
popUp.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    popUp.classList.remove('opened');
  }
});



function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInfo.textContent = nameInput.value;
  jobInfo.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

saveInfo.addEventListener('click', function () {
  popUp.classList.remove('opened');
})
