import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

// // @ts-ignore
// const noSessionNoAccount = require(
//   '../mocks/account-settings/no-active-session_no-account.json');
// // @ts-ignore
// const noSessionHasAccount = require(
//   '../mocks/account-settings/no-active-session_has-account.json');

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsService implements OnDestroy {
  private subscription = new Subscription();
  private stateSubj = new BehaviorSubject(null);
  public state$ = this.stateSubj.asObservable();

  constructor(private http: HttpClient) {}

  fetchAccountSettings() {
    this.subscription.add(
      this.http.get(environment.api.account).
        subscribe(resp => this.stateSubj.next(resp)),
    );
    // setTimeout(() => { this.stateSubj.next(noSessionNoAccount); }, 500);
  }

  switchAccount(account: any) {
    this.subscription.add(
      this.http.post(environment.api.switchAccount, {account}).
        subscribe(resp => this.stateSubj.next(resp)),
    );
    // setTimeout(() => { this.stateSubj.next(noSessionHasAccount); }, 500);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
