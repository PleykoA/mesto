export class UserInfo {
  constructor({ profileName, profileInfo }) {
    this._profileName = document.querySelector(profileName);
    this._profileInfo = document.querySelector(profileInfo);
  }

  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      info: this._profileInfo.textContent
    }
    return this._userData;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.Name;
    this._profileInfo.textContent = data.Job;
  }
}
