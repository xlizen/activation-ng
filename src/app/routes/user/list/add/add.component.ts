import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {_HttpClient} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class UserListAddComponent implements OnInit, OnDestroy {

  constructor(fb: FormBuilder, private router: Router, public http: _HttpClient,
              public msg: NzMessageService, private modal: NzModalRef) {
    this.form = fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm: [null, [this.confirmValidator]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  // #region fields

  get mail(): AbstractControl {
    return this.form.controls.mail;
  }

  get password(): AbstractControl {
    return this.form.controls.password;
  }

  get confirm(): AbstractControl {
    return this.form.controls.confirm;
  }

  form: FormGroup;
  error = '';
  type = 0;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap: { [key: string]: 'success' | 'normal' | 'exception' } = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  ngOnInit(): void {
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.form.controls.confirm.updateValueAndValidity());
  }


  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };



  submit(): void {
    const data = this.form.value;
    this.http.put('user', data).subscribe((res) => {
      this.msg.success(res.msg);
      this.modal.close(true);
    });
  }


  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.form.reset();
    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        this.form.controls[key].markAsPristine();
        this.form.controls[key].updateValueAndValidity();
      }
    }
  }
  ngOnDestroy(): void {
    this.modal.destroy();
  }
}
