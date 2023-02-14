import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.form');
    this._popupInputs = this._popup.querySelectorAll('.form__input');
    this._popupSubmitButton = this._popup.querySelector('.form__save-button');
  }


  _getInputValues() {
    const inputs = {};
    this._popupInputs.forEach((input) => {
      const name = input.name;
      const value = input.value;

      inputs[name] = value;
    });
    return inputs;
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }




  close() {
    super.close();
    this._popupForm.reset();
  }

  rendererLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = 'Сохранение...'
    } else {
      this._popupSubmitButton.textContent = 'Сохранение'
    }
  }
}

