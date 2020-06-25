import { Component, OnInit } from '@angular/core';
import {AccountSettingsService} from '../account-settings.service';

@Component({
  selector: 'app-switch-account',
  templateUrl: './switch-account.component.html',
  styleUrls: ['./switch-account.component.scss']
})
export class SwitchAccountComponent {
  public accountSettings$ = this.accountSettingsSvc.state$;

  constructor(private accountSettingsSvc: AccountSettingsService) {}

  switchAccount(account) {
    this.accountSettingsSvc.switchAccount(account);
  }
}
