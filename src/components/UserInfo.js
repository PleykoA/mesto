export class UserInfo {

  constructor({ profileName, profileInfo, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileInfo = document.querySelector(profileInfo);
    this._profileAvatar = document.querySelector(profileAvatar);
  }


  getUserInfo() {
    return {
      name: this._profileName.textContent,
      info: this._profileInfo.textContent,
      id: this._userId
    }
  }

  getUserAvatar() {
    return {
      avatar: this._profileAvatar.src
    }
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }

  setUserInfo(name, about, userId) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = about;
    this._userId = userId;
  }

  getUserId() {
    return this._userId
  }
}
