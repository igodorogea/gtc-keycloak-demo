import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwitchAccountComponent} from './switch-account.component';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [SwitchAccountComponent],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: '',
        component: SwitchAccountComponent,
      }]),
  ],
})
export class SwitchAccountModule {}
