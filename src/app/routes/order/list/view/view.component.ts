import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Order } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-order-list-view',
  templateUrl: './view.component.html',
})
export class OrderListViewComponent implements OnInit {
  record: any = {};
  i: Order;

  constructor(private modal: NzModalRef, public msgSrv: NzMessageService, public http: _HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.http.get(`order/getById?id=${this.record.id}`).subscribe((res) => (this.i = res.data));
  }

  close(): void {
    this.modal.destroy();
  }
}
