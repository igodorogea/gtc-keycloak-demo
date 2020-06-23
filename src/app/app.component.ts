import {Component} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private keycloakService: KeycloakService) {}

  async logout() {
    await this.keycloakService.logout();
  }
}
