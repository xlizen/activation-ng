import {Component, OnInit, ViewChild} from '@angular/core';
import {SFSchema, SFUISchema} from '@delon/form';
import {_HttpClient} from '@delon/theme';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalRef} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-list-edit',
  templateUrl: './edit.component.html',
})
export class UserListEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      username: {type: 'string', title: '用户名', maxLength: 15},
      name: {type: 'string', title: '昵称', maxLength: 15},
      email: {type: 'string', title: '邮箱'},
      phone: {type: 'string', title: '手机号'},
      profile: {type: 'string', title: '描述', maxLength: 140},
    },
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: {span: 12},
    },
    $username: {
      widget: 'text'
    },
    $name: {
      widget: 'string',
    },
    $phone: {
      widget: 'string',
    },
    $email: {
      widget: 'string',
    },
    $profile: {
      widget: 'textarea',
      grid: {span: 24},
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {
  }

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.http.get(`user/${this.record.id}`).subscribe(res => (this.i = res.data));
    }
  }

  save(value: any): void {
    this.http.post(`user/${this.record.id}`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
