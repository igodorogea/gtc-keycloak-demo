import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigService} from './config.service';

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
})
export class ConfigFormComponent {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private configSvc: ConfigService) {
    this.form = this.fb.group({
      url: ['', Validators.required],
      realm: ['', Validators.required],
      clientId: ['', Validators.required],
    });
    this.form.setValue(configSvc.load());
  }

  saveConfig() {
    this.configSvc.save(this.form.value);
  }
}
