import {Injectable} from '@angular/core';
import {KeycloakInstance} from 'keycloak-js';
import {loadScript} from './load-script';
import {environment} from '../../environments/environment';

/// <reference path="/node_modules/keycloak-js/dist/keycloak.d.ts" />
declare var Keycloak: any;

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  instance: KeycloakInstance;

  init() {
    return loadScript(`${environment.keycloak.url}/js/keycloak.js`).then(() => {
      this.instance = new Keycloak(environment.keycloak);
      return this.instance.init({onLoad: 'login-required'});
    }).then(() => {
      console.log(this.instance);
      return this.instance;
    }).catch((e) => {
      console.log(e);
    });
  }

  logout() {
    this.instance.logout();
  }

  getToken() {
    if (!this.instance.authenticated) {
      return this.instance.login().then(() => console.log(this.instance));
    } else {
      return this.instance.updateToken(0).
        then(console.log).
        then(() => this.instance.token);
    }
  }
}
