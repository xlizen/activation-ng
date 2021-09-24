import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

interface ProAccountSettingsUser {
  id: string;
  email: string;
  name: string;
  profile: string;
  phone: string;
  avatar: string;
}

@Component({
  selector: 'app-account-settings-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProAccountSettingsBaseComponent implements OnInit {
  constructor(private http: _HttpClient, private cdr: ChangeDetectorRef, private msg: NzMessageService) {}

  avatar = environment.SERVER_URL;
  userLoading = false;
  user: ProAccountSettingsUser;

  ngOnInit(): void {
    this.http.get('user/current').subscribe((res) => {
      this.userLoading = false;
      this.user = res.data;
      this.cdr.detectChanges();
    });
  }

  // #endregion

  save(): boolean {
    this.http.post(`user/${this.user.id}`, this.user).subscribe((res) => {
      this.msg.success(res.msg);
    });
    return false;
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        // Get this url from response in real world.
        this.user.avatar = info.file.response.src;
        this.cdr.detectChanges();
        break;
      case 'error':
        this.msg.error('Network error');
        break;
    }
  }
}
