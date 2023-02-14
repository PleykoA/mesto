export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _response(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this._baseUrl}/users/me`,
      { headers: this._headers })
      .then(res =>
        this._response(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      { headers: this._headers })
      .then(res =>
        this._response(res));
  }

  addCard(card) {
    return fetch(`${this._baseUr}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: card.place,
        link: card.link
      }),
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }


  deleteCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }


  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      }),
      headers: this._headers
    })
      .then(res =>
        this._response(res));
  }

}

