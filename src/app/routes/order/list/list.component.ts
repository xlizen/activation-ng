import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData, STPage } from '@delon/abc/st';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { Order } from '@shared';
import { OrderListEditComponent } from './edit/edit.component';
import { OrderListViewComponent } from './view/view.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
})
export class OrderListComponent implements OnInit {
  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  url = `order/list`;
  data: STData[] = [];
  loading = false;
  dateFormat = 'yyyy-MM-dd';

  q: Order = {
    total: 0,
    page: 1,
    limit: 10,
    clientName: '',
    address: '',
    createTimeRange: [],
    useTimeRange: [],
  };

  pages: STPage = {
    total: '', // 分页显示多少条数据，字符串型
    show: true, // 显示分页
    front: false, // 关闭前端分页，true是前端分页，false后端控制分页
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
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'static',
          modal: { component: OrderListViewComponent },
        },
        { text: '编辑', type: 'modal', modal: { component: OrderListEditComponent }, click: 'reload' },
      ],
    },
  ];

  add(): any {
    this.modal.createStatic(OrderListEditComponent, { i: { id: 0 } }).subscribe(() => this.st.reload());
  }

  ngOnInit(): void {
    this.load(this.q);
  }

  load(page: Order): void {
    this.setTimeRange(page);
    this.http.post(this.url, page).subscribe((res: any) => {
      console.log(res);
      this.data = Array(res.data.length)
        .fill({})
        .map((item: any, idx: number) => {
          return res.data[idx];
        });

      this.q.total = res.count;
      this.q.page = res.pi;
      this.q.limit = res.ps;
      this.pages.total = '共' + this.q.total + '条';
    });
  }

  change(ret: STChange): void {
    if (ret.pi && this.q.page !== ret.pi) {
      this.q.page = ret.pi;
      this.load(this.q);
    }
  }

  getData(): void {
    this.load(this.q);
  }

  reset(): void {
    this.q.clientName = '';
    this.q.address = '';
    this.q.page = 1;
    this.q.limit = 10;
    this.q.useTimeRange = [];
    this.q.createTimeRange = [];
    this.load(this.q);
  }

  setTimeRange(condition: Order): void {
    if (condition.createTimeRange && condition.createTimeRange.length > 1) {
      condition.minCreateTime = formatDate(condition.createTimeRange[0], this.dateFormat, 'zh');
      condition.maxCreateTime = formatDate(condition.createTimeRange[1], this.dateFormat, 'zh');
    } else {
      condition.minCreateTime = null;
      condition.maxCreateTime = null;
    }
    if (condition.useTimeRange && condition.useTimeRange.length > 1) {
      condition.minUseTime = formatDate(condition.useTimeRange[0], this.dateFormat, 'zh');
      condition.maxUseTime = formatDate(condition.useTimeRange[1], this.dateFormat, 'zh');
    } else {
      condition.minUseTime = null;
      condition.maxUseTime = null;
    }
  }
}
