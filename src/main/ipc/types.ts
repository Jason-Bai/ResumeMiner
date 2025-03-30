// IPC 通道定义
export enum IPCMainChannels {
  GET_APP_VERSION = "get-app-version",
  GET_RESUMES = "get-resumes",
  GET_RESUME = "get-resume",
  GET_RESUMES_BY_PARAMS = "get-resumes-by-params",
  SAVE_RESUME = "save-resume",
  UPDATE_RESUME = "update-resume",
  DELETE_RESUME = "delete-resume",
  REFRESH_SKILLS = "refresh-skills",
}

export enum IPCRendererChannels {
  LOG_EVENT = "log-event",
}

// 通用响应类型
export interface IpcResponse<T> {
  success: boolean;
  data: {
    code: number;
    data: T;
  };
  message: string;
}

// 分页响应类型
export interface IpcPageResponse<T> extends IpcResponse<T> {
  data: {
    code: number;
    data: T;
    total: number;
    page: number;
    pageSize: number;
  };
}

// 分页请求参数
export interface IpcPageParams {
  page: number;
  pageSize: number;
}

// 排序参数
export interface IpcSortParams {
  field: string;
  order: "asc" | "desc";
}

// 查询参数
export interface IpcQueryParams {
  keyword?: string;
  filters?: Record<string, any>;
  sort?: IpcSortParams;
}
