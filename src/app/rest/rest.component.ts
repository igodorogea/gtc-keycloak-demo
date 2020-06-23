import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
})
export class RestComponent {
  form: FormGroup;
  response$: Observable<any>;

  constructor(
    private keycloakService: KeycloakService, private fb: FormBuilder,
    private http: HttpClient) {
    const lastUrl = localStorage.getItem('REST_API_URL');
    this.form = this.fb.group({
      apiUrl: [lastUrl || '', Validators.required],
    });
  }

  async callApi() {
    const {apiUrl} = this.form.value;
    localStorage.setItem('REST_API_URL', apiUrl);
    this.keycloakService.updateToken(30).then(() => {
      this.response$ = this.http.get(apiUrl);
    }).catch(() => {
      alert('Token expired, go to restricted page and login again');
    });
  }
}
