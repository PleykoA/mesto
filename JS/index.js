
let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button')
let editButton = document.querySelector('.profile__edit-button');
let nameInfo = document.querySelector('.profile__title');
let jobInfo = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__edit');


/*doc.addEventListener("click", ({ target }) => {
  const likeBtn = target.closest(".element__like")

  if (!likeBtn) return;
  likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
  likeBtn.ariaLabel = aria.label[likeBtn.ariaPressed];
})
  ;*/


editButton.addEventListener('click', function () {
  popUp.classList.add('popup_opened');
})

function closePopUp () {
  popUp.classList.remove('popup_opened');
};

//форма в DOM
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-info');

//поля формы в DOM

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
}

closeButton.addEventListener('click', closePopUp);

formElement.addEventListener('submit', formSubmitHandler);

