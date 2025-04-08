// IPC 通道定义
export enum IPCMainChannels {
  GET_APP_VERSION = "get-app-version",
  GET_RESUMES = "get-resumes",
  GET_RESUME = "get-resume",
  GET_RESUMES_BY_PARAMS = "get-resumes-by-params",
  GET_RESUMES_BY_PARAMS_WITH_PAGINATION = "get-resumes-by-params-with-pagination",
  SAVE_RESUME = "save-resume",
  UPDATE_RESUME = "update-resume",
  DELETE_RESUME = "delete-resume",
  REFRESH_SKILLS = "refresh-skills",
  GET_KEYS = "get-keys",
  SAVE_KEY = "save-key",
  UPDATE_KEY = "update-key",
  DELETE_KEY = "delete-key",
  GET_PROMPTS = "get-prompts",
  SAVE_PROMPT = "save-prompt",
  UPDATE_PROMPT = "update-prompt",
  DELETE_PROMPT = "delete-prompt",
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

export interface IpcPageResponseData<T> {
  list: T;
  total: number;
  page: number;
  pageSize: number;
}

// 分页响应类型
export interface IpcPageResponse<T> {
  success: boolean;
  data: {
    code: number;
    data: IpcPageResponseData<T>;
  };
  message: string;
}

// 分页请求参数
export interface IpcPaginationParams {
  page: number;
  pageSize: number;
}

// 排序参数
export interface IpcSortParams {
  field: string;
  order: "asc" | "desc";
}

export interface IpcPageParams<T> extends IpcPaginationParams {
  params: T;
  sort: IpcSortParams;
}
