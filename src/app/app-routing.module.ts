import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigFormComponent} from './config-form/config-form.component';
import {RestrictedComponent} from './restricted/restricted.component';
import {RestComponent} from './rest/rest.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/config',
    pathMatch: 'full',
  },
  {
    path: 'config',
    component: ConfigFormComponent,
  },
  {
    path: 'restricted',
    component: RestrictedComponent,
  },
  {
    path: 'rest',
    component: RestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
