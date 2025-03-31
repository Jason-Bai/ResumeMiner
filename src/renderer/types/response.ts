export interface Response<T> {
  success: boolean;
  data: {
    code: number;
    data: T;
  };
  message: string;
}

export interface PageResponseData<T> {
  list: T;
  total: number;
  page: number;
  pageSize: number;
}

// 分页响应类型
export interface PageResponse<T> {
  success: boolean;
  data: {
    code: number;
    data: PageResponseData<T>;
  };
  message: string;
}

// 分页请求参数
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 排序参数
export interface SortParams {
  field: string;
  order: "asc" | "desc";
}

export interface PageParams<T> extends PaginationParams {
  params: T;
  sort: SortParams;
}
