import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {KeycloakService} from './auth/keycloak.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {KeycloakBearerInterceptor} from './keycloak-bearer.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'switch-account',
        loadChildren: () => import('./switch-account/switch-account.module').then(
          m => m.SwitchAccountModule),
      },
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private keycloak: KeycloakService) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    // deal with authentication ASAP
    // no reason in bootstrapping the app if the user is not authenticated
    this.keycloak.init().then(() => appRef.bootstrap(AppComponent));
  }
}
