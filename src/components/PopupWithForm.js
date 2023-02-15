import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ submit }, popupSelector) {
    super(popupSelector);
    this._submit = submit;
    this._popupForm = this._popup.querySelector('.form');
    this._inputs = this._popup.querySelectorAll('.form__input');
    this._submitBtn = this._popup.querySelector('.form__save-button');
  }


  _getInputValues() {
    const inputs = {};
    Array.from(this._inputs).forEach(inputElement => {
      inputs[inputElement.name] = inputElement.value;
    })

    return inputs;
  }

  isLoading(loading) {
    if (loading) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = 'Сохранение'
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }


}

