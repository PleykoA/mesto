import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popup = popupElement;
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open()
    this._image.src = link
    this._image.alt = name
    this._caption.textContent = name
  }
}
