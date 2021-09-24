import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { UserListAddComponent } from './add/add.component';
import { UserListEditComponent } from './edit/edit.component';
import { UserListViewComponent } from './view/view.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
})
export class UserListComponent implements OnInit {
  url = `user/list`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '昵称', index: 'name' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '手机号', index: 'phone' },
    { title: '邮箱', index: 'email' },
    {
      title: '',
      buttons: [
        { text: '查看', type: 'static', modal: { component: UserListViewComponent } },
        { text: '编辑', type: 'static', modal: { component: UserListEditComponent }, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit(): void {}

  add(): void {
    this.modal.open(UserListAddComponent, { i: { id: 0 }, size: 'sm' }).subscribe(() => this.st.reload());
  }
}
