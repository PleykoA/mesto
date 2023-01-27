import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor({ submit }, popup) {
    super(popup);
    this._submit = submit;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._popup.querySelectorAll('.form__input');
  }

  _getInputValues() {
    const inputs = {};
    Array.from(this._inputs).forEach(inputElement => {
      inputs[inputElement.name] = inputElement.value;
    })
    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
