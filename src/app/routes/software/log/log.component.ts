import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STData, STPage } from '@delon/abc/st';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { Software } from '@shared';

@Component({
  selector: 'app-software-log',
  templateUrl: './log.component.html',
})
export class SoftwareLogComponent implements OnInit {
  url = `software/list`;
  data: STData[] = [];
  loading = false;
  dateFormat = 'yyyy-MM-dd';

  q: Software = {
    total: 0,
    page: 1,
    limit: 10,
    name: '',
    createTimeRange: [],
  };

  pages: STPage = {
    total: '', // 分页显示多少条数据，字符串型
    show: true, // 显示分页
    front: false, // 关闭前端分页，true是前端分页，false后端控制分页
  };

  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '姓名', index: 'name' },
    { title: '公司', width: '50px', index: 'companyName' },
    { title: '职位', index: 'title' },
    { title: 'IP', index: 'ip' },
    { title: 'Mac', index: 'mac' },
    { title: 'SN', index: 'sn' },
    { title: '软件名称', index: 'software' },
    { title: '版本', index: 'version' },
    { title: '获取时间', type: 'date', dateFormat: 'yyyy-MM-dd', index: 'createTime' },

    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit(): void {
    this.load(this.q);
  }

  load(page: Software): void {
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
    this.q.name = '';
    this.q.page = 1;
    this.q.limit = 10;
    this.q.createTimeRange = [];
    this.load(this.q);
  }

  setTimeRange(condition: Software): void {
    if (condition.createTimeRange && condition.createTimeRange.length > 1) {
      condition.minCreateTime = formatDate(condition.createTimeRange[0], this.dateFormat, 'zh');
      condition.maxCreateTime = formatDate(condition.createTimeRange[1], this.dateFormat, 'zh');
    } else {
      condition.minCreateTime = null;
      condition.maxCreateTime = null;
    }
  }
}
