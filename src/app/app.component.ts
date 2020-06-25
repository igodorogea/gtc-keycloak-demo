import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountSettingsService} from './account-settings.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  accountSettings;

  constructor(
    private accountSettingsSvc: AccountSettingsService,
    private router: Router) {
    this.accountSettingsSvc.fetchAccountSettings();
  }

  ngOnInit() {
    this.subscription.add(
      this.accountSettingsSvc.state$.subscribe(accountSettings => {
        this.accountSettings = accountSettings
        console.log(accountSettings);
        if (accountSettings?.coID) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/switch-account']);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
