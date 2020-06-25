import {Injectable} from '@angular/core';
import {KeycloakService} from './keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {}
}
