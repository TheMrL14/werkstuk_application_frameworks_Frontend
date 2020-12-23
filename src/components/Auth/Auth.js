import auth0 from "auth0-js";
import User from "../../model/User";

const REDIRECT_ON_LOGIN = "redirect_on_login";
const path = require("../../PATHS");
//private
let _idToken = null;
let _accessToken = null;
let _scopes = null;
let _expiresAt = null;
let _user = null;

export default class Auth {
  constructor(history) {
    this.history = history;
    this.requestedScopes = "openid profile email write:products";
    this.auth0 = new auth0.WebAuth({
      domain: "appframework-dev.eu.auth0.com",
      clientID: "ulOgeb4EEJYSQ5I0X1Sj6xyJcBwvhGFC",
      redirectUri: "http://localhost:3000/callback",
      audience: "http://localhost:8080",
      responseType: "token id_token",
      scope: this.requestedScopes,
    });
  }

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const redirectLocation =
          localStorage.getItem(REDIRECT_ON_LOGIN) === "undefined"
            ? "/"
            : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}`);
      }
    });
  };

  setSession = (authResult) => {
    _expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    _scopes = authResult.scope || this.requestedScopes || "";
    _accessToken = authResult.accessToken;
    _idToken = authResult.idToken;
    console.log(authResult);
    let userData = authResult.idTokenPayload;
    _user = new User(userData.sub, userData.nickname, userData.email);
    updateUserDB(_user);
  };

  isAuthenticated() {
    return new Date().getTime() < _expiresAt;
  }

  logout = () => {
    this.auth0.logout({
      clientID: "ulOgeb4EEJYSQ5I0X1Sj6xyJcBwvhGFC",
      returnTo: "http://localhost:3000",
    });
  };

  getAccessToken = () => {
    if (!_accessToken) throw new Error("No access token found");
    return _accessToken;
  };

  getProfile = (callback) => {
    if (this.userProfile) return callback(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      callback(profile, err);
    });
  };

  userHasScopes(scopes) {
    const grantedScopes = (_scopes || "").split(" ");

    return scopes.every((scope) => grantedScopes.includes(scope));
  }
}

let updateUserDB = (newUser) => {
  getUserById(newUser, createUser(newUser));
};

let getUserById = (user, callback) => {
  fetch(path.USER + "/" + user.id, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${_accessToken}`,
    },
  })
    .then((response) => {
      if (response.ok) return response.json();
      console.log("Error: ", response);
    })
    .then((json) => {
      if (json == null) callback();
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

let createUser = (user) => {
  fetch(path.CREATE_USER, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${_accessToken}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((json) => {
      console.log("new User: ", json);
    })
    .catch((error) => {
      console.log("Create Error: ", error);
    });
};
