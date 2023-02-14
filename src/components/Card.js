export class Card {

  constructor(item, cardTemplate, userId, { handleCardClick, handleCardDelete, handleLikeClick }) {
    this._text = item.name;
    this._image = item.link;
    this._alt = item.name;
    this._likes = item.likes;

    this._id = item._id;
    this._userId = userId;

    this._ownerId = item.owner._id;

    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
  }



  _getTemplateCard() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }



  generateCard() {
    this._element = this._getTemplateCard();

    this._element.querySelector('.card__title').textContent = this._text;
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like');
    this._deleteButton = this._element.querySelector('.card__delete');
    this._likeCount = this._element.querySelector('.card__like-count');
    if (!this.likedCard()) {
      this._likeButton.classList.remove('active');
    } else {
      this._likeButton.classList.add('active');
    }

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._likeCount.textContent = this._likesLength;

    this._setEventListeners();

    return this._element;
  }


  likedCard() {
    return !!this._likes.find(like => like._id === this._userId)
  }

  toggleLike() {
    this._likeButton.classList.toggle('active');
  }

  setLikes(likes) {
    this._likes = likes
    this._likesLength = likes.length;
    this._likeCount.textContent = this._likesLength;
  }

/*   putCardLikeButton() {
    this._likeButton.classList.add('active');

  }

  dislikeCardLikeButton() {
    this._likeButton.classList.remove('active');

  }

  _toggleCardLike() {
    if (this._likes.find((user) => user._id === this._userId)) {
      this.putCardLikeButton()
    } else {
      this.dislikeCardLikeButton()
    }
  }

  handleCardLikeCounter(data) {
    this._likeCount.textContent = data.length;
  } */

  deleteCard() {
    this._element.remove();
    this.element = null;
  }
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._image);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this)
    });

    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', () => {
        this._handleCardDelete(this);
      });
    }
  }

}
