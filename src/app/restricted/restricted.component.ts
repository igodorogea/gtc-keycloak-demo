import {Component} from '@angular/core';
import {KeycloakProfile} from 'keycloak-js';
import {ConfigService} from '../config-form/config.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
})
export class RestrictedComponent {
  userDetails: KeycloakProfile;
  token: string;

  constructor(
    private keycloakService: KeycloakService,
    private configSvc: ConfigService) {
    this.init();
  }

  async init() {
    const config = this.configSvc.load();
    if (config) {
      await this.keycloakService.init({
        config, initOptions: {onLoad: 'login-required'},
      });
    } else {
      alert('config is missing');
    }
  }

  async fetchToken() {
    if (await this.keycloakService.isLoggedIn()) {
      this.token = await this.keycloakService.getToken();
    }
  }

  async fetchUserDetails() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }
  }
}
