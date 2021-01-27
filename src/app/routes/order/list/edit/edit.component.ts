import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { Order } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-order-list-edit',
  templateUrl: './edit.component.html',
})
export class OrderListEditComponent implements OnInit {
  record: any = {};
  i: Order;
  schema: SFSchema = {
    properties: {
      id: { type: 'string', title: '编号' },
      clientName: { type: 'string', title: '客户名称', maxLength: 15 },
      phone: { type: 'string', title: '联系电话' },
      email: { type: 'string', title: '邮箱' },
      address: { type: 'string', title: '地址', maxLength: 140 },
      remark: { type: 'string', title: '描述', maxLength: 140 },
    },
    required: ['clientName', 'phone'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $id: {
      widget: 'text',
    },
    $clientName: {
      widget: 'string',
    },
    $phone: {
      widget: 'string',
    },
    $email: {
      widget: 'string',
    },
    $address: {
      widget: 'textarea',
      grid: { span: 24 },
    },
    $remark: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    if (this.record.id > 0) {
      this.http.get(`order/getById?id=${this.record.id}`).subscribe((res) => (this.i = res.data));
    }
  }

  save(value: any): void {
    if (this.record.id === undefined) {
      this.record.id = 0;
    }
    this.http.post(`order/${this.record.id}`, value).subscribe((res) => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close(): void {
    this.modal.destroy();
  }

  title(): string {
    if (this.record.id > 0) {
      return `编辑 ${this.record.id} 信息`;
    } else {
      return `新增订单`;
    }
  }
}
