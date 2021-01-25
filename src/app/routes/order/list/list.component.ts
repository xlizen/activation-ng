import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STData, STRes } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
})
export class OrderListComponent implements OnInit {
  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  url = `order/list`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号',
      },
    },
  };

  result: STRes = {
    process: (data: STData[], rawData?: any) => {
      return rawData.data;
    },
  };

  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { type: 'checkbox' },
    { title: '编号', index: 'id' },
    { title: '客户名', width: '100px', index: 'clientName' },
    { title: 'SN', width: '135px', index: 'sn' },
    { title: '联系方式', width: '135px', index: 'phone' },
    { title: '邮箱', width: '135px', index: 'email' },
    { title: '地址', width: '150px', index: 'address' },
    { title: '购买时间', type: 'date', width: '150px', index: 'createTime' },
    { title: '激活时间', type: 'date', width: '150px', index: 'useTime' },
    {
      title: '',
      /*      buttons: [
        {text: '查看', click: (item: any) => `/form/${item.id}`},
       {text: '编辑', type: 'static', component: FormEditComponent, click: 'reload'}
      ]*/
    },
  ];

  add(): any {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  ngOnInit(): void {}
}
