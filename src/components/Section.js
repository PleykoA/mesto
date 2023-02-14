export class Section {

  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }


  addItem(element) {
    this._container.prepend(element);
  }


  renderItems(items) {
    items.forEach((el) => {
      this.addItem(this._renderer(el))
    })
  }
}
