export class Card {
  constructor(item, cardTemplate, openImagePopup) {
    this._text = item.name;
    this._image = item.link;
    this._alt = item.name;
    this._cardTemplate = cardTemplate;
    this._openImagePopup = openImagePopup;
  }

  _getTemplateCard() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplateCard();

    this._element.querySelector('.card__title').textContent = this._text;
    this._cardImage = this._element.querySelector('.card__image');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;

    this._setEventListeners();

    return this._element;
  }

  _likeCard() {
    this.classList.toggle('active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', this._likeCard);
    this._element.querySelector('.card__delete').addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => {
      this._openImagePopup(this._text, this._image);
    })
      ;
  }
}
