import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupForm = this._popup.querySelector('.form');
  }

  sendConfirmation(callback) {
    this._submit = callback;
  }
  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit();
    })
  }
}
