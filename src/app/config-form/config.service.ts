import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public defaultConfig = {
    url: 'http://localhost:8080/auth',
    realm: 'myrealm',
    clientId: 'myclient',
  };

  constructor() { }

  load() {
    const url = localStorage.getItem('KEYCLOAK_URL');
    const realm = localStorage.getItem('KEYCLOAK_REALM');
    const clientId = localStorage.getItem('KEYCLOAK_CLIENT_ID');
    if (url && realm && clientId) {
      return {url, realm, clientId};
    } else {
      return this.defaultConfig
    }
  }

  save(config) {
    localStorage.setItem('KEYCLOAK_URL', config.url);
    localStorage.setItem('KEYCLOAK_REALM', config.realm);
    localStorage.setItem('KEYCLOAK_CLIENT_ID', config.clientId);
  }
}
