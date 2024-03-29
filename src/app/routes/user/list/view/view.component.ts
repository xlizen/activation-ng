import {Component, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {_HttpClient} from '@delon/theme';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './view.component.html',
})
export class UserListViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get(`user/${this.record.id}`).subscribe(res => this.i = res.data);
  }

  close(): void {
    this.modal.destroy();
  }
}
