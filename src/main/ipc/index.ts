import { app, ipcMain } from "electron";
import { IPCMainChannels, IPCRendererChannels } from "./types";
import { wrapIpcHandler } from "./utils/response";
import {
  handleGetResumes,
  handleGetResume,
  handleGetResumesByParams,
} from "./handlers/resume";

// 处理获取版本请求
const getAppVersion = async () => {
  return await app.getVersion();
};

const handleGetAppVersion = wrapIpcHandler(
  getAppVersion,
  "获取版本成功",
  "获取版本失败",
  ""
);

// 处理日志事件
const handleLogEvent = (_: any, message: string): void => {
  console.log("[Renderer Log]:", message);
};

// 注册所有 IPC 处理器
export function registerIPC() {
  // 版本相关
  ipcMain.handle(IPCMainChannels.GET_APP_VERSION, handleGetAppVersion);

  // 简历相关
  ipcMain.handle(IPCMainChannels.GET_RESUMES, handleGetResumes);
  ipcMain.handle(IPCMainChannels.GET_RESUME, handleGetResume);
  ipcMain.handle(
    IPCMainChannels.GET_RESUMES_BY_PARAMS,
    handleGetResumesByParams
  );

  // 日志相关
  ipcMain.on(IPCRendererChannels.LOG_EVENT, handleLogEvent);
}
