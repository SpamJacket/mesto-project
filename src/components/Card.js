export default class Card {
  constructor({ link, name, owner, likes, _id }, templateSelector, mainUserId, likeFetch, popupImg, popupAcceptDelete) {
    this._templateSelector = templateSelector;
    this._mainUserId = mainUserId;
    this._link = link;
    this._name = name;
    this._ownerId = owner._id;
    this._likes = likes.map(owner => owner._id);
    this._id = _id;
    this._likeFetch = likeFetch;
    this._cardElement = document.querySelector('#gallery-item').content.querySelector('.gallery__item').cloneNode(true);
    this._imageCardElement = this._cardElement.querySelector('.gallery__image');
    this._titleCardElement = this._cardElement.querySelector('.gallery__title');
    this._likeCardElement = this._cardElement.querySelector('.gallery__like');
    this._likeCounterCardElement = this._cardElement.querySelector('.gallery__like-counter');
    this._deleteCardElement = this._cardElement.querySelector('.gallery__delete-button');
    this._popupAcceptDelete = popupAcceptDelete;
    this._popupImg = popupImg;

    this._handleImageClick = this._handleImageClick.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._renderLike = this._renderLike.bind(this);
  }

  _renderCardElement() {
    this._cardElement.id = this._id;

    this._imageCardElement.src = this._link;
    this._imageCardElement.alt = this._name;
    this._titleCardElement.textContent = this._name;

    this._likeCounterCardElement.textContent = this._likes.length;

    if(this._likes.includes(this._mainUserId)) {
      this._likeCardElement.classList.add('gallery__like_active');
    }

    if(this._ownerId !== this._mainUserId) {
      this._deleteCardElement.remove();
    }
  }

  _setEventListeners() {
    this._imageCardElement.addEventListener('click', this._handleImageClick);
    this._likeCardElement.addEventListener('click', this._handleLikeClick);
    this._deleteCardElement.addEventListener('click', this._handleDeleteClick);
  }

  _handleImageClick() {
    this._popupImg.openPopup(this._link, this._name);
  }

  _handleLikeClick() {
    if(!this._likes.includes(this._mainUserId)) {
      this._likeFetch(this._id, 'PUT')
        .then(this._renderLike)
        .catch(err => console.log(err));
    } else {
      this._likeFetch(this._id, 'DELETE')
        .then(this._renderLike)
        .catch(err => console.log(err));
    }
  }

  _handleDeleteClick() {
    this._popupAcceptDelete.openPopup();

    sessionStorage.setItem('delete-card-id', this._id);
  }

  _renderLike(card) {
    this._likes = card.likes.map(owner => owner._id);
    this._likeCounterCardElement.textContent = this._likes.length;

    this._likeCardElement.classList.toggle('gallery__like_active');
  }

  createCard() {
    this._renderCardElement();
    this._setEventListeners();

    return this._cardElement;
  }
}