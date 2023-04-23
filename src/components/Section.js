export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Рендерит каждый элемент массива
  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  // Добавляет элемент в конец контейнера
  addItem(item) {
    this._container.append(item);
  }

  // Добавляет элемент в начало контейнера
  addItemReverse(item) {
    this._container.prepend(item);
  }
}