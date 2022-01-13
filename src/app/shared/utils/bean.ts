export interface Bean {
  page: number;
  limit: number;
  total: number;
}

export interface Order extends Bean {
  id?: string;
  sn?: string;
  pass?: string;
  clientName: string;
  phone?: string;
  email?: string;
  address?: string;
  remark?: string;
  createTime?: string;

  createTimeRange?: Date[];
  maxCreateTime?: string;
  minCreateTime?: string;

  useTime?: string;
  useTimeRange?: Date[];
  maxUseTime?: string;
  minUseTime?: string;
}

export interface Software extends Bean {
  id?: string;
  sn?: string;
  name: string;
  phone?: string;
  email?: string;
  companyName?: string;

  ip?: string;
  mac?: string;
  softName?: string;
  version?: string;

  createTime?: string;

  createTimeRange?: Date[];
  maxCreateTime?: string;
  minCreateTime?: string;
}
