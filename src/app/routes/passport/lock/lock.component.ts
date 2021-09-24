import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SettingsService, User, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'passport-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.less'],
})
export class UserLockComponent {
  f: FormGroup;

  get user(): User {
    return this.settings.user;
  }

  constructor(
    fb: FormBuilder,
    private router: Router,
    private settings: SettingsService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private aclSrv: ACLService,
  ) {
    this.f = fb.group({
      password: [null, Validators.required],
    });
  }

  submit(): void {
    // tslint:disable-next-line:forin
    for (const i in this.f.controls) {
      this.f.controls[i].markAsDirty();
      this.f.controls[i].updateValueAndValidity();
    }
    if (this.f.valid) {
      this.http
        .post('admin/acl/login?_allow_anonymous=true', {
          username: this.user.username,
          password: this.f.value.password,
        })
        .subscribe((res) => {
          if (res.code === 0) {
            // 设置用户Token信息
            res.user.expired = +new Date() + 1000 * 60 * 3;
            this.tokenService.set(res.user);
            this.aclSrv.setAbility(res.user.permission);
            // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
            this.startupSrv.load().then(() => {
              let url = this.tokenService.referrer!.url || '/';
              if (url.includes('/passport')) {
                url = '/';
              }
              this.router.navigateByUrl(url);
            });
            this.msg.success('unlock successful');
          } else {
            this.router.navigateByUrl('/passport/login');
            this.msg.success('unlock fialed,please login');
          }
        });
    }
  }
}
