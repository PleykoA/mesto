export class Card {

  constructor(item, cardTemplate, userId, { handleCardClick, handleDeleteCard, handleLikeCard }) {
    this._text = item.name;
    this._image = item.link;
    this._alt = item.name;
    this._likes = item.likes;
    this._id = item._id;
    this._userId = userId;
    this._ownerId = item.owner._id;

    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplateCard() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }


  generateCard() {
    this._element = this._getTemplateCard();

    this._element.querySelector('.card__title').textContent = this._text;
    this._cardImage = this._element.querySelector('.card__image');
    this._likeBtn = this._element.querySelector('.card__like');
    this._deleteBtn = this._element.querySelector('.card__delete');
    this._likeCount = this._element.querySelector('.card__like-count');
    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._likeCount.textContent = this._likes.length;

    if (!this.likedCard()) {
      this._likeBtn.classList.remove('active');
    } else {
      this._likeBtn.classList.add('active');
    }

    this._setEventListeners();

    return this._element;
  }


  likedCard() {
    return this._likes.some(like => like._id === this._userId)
  }

  toggleLikeCard() {
    this._likeBtn.classList.toggle('active');
  }

  setLikesCount(likes) {
    this._likes = likes
    this._likesAmount = likes.length;
    this._likeCount.textContent = this._likesAmount;
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image);
    });

    this._likeBtn.addEventListener('click', () => {
      this._handleLikeCard(this)
    });

    if (this._userId !== this._ownerId) {
      this._deleteBtn.remove();
    } else {
      this._deleteBtn.addEventListener('click', () => {
        this._handleDeleteCard(this);
      });
    }
  }

}
