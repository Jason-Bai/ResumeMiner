// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// src/main/preload.ts
import { contextBridge, ipcRenderer } from "electron";
import {
  IPCMainChannels,
  IPCRendererChannels,
  IpcPageParams,
} from "./ipc/types";
import type { Resume } from "./database/entities/Resume";

// 添加日志帮助调试
contextBridge.exposeInMainWorld("electronAPI", {
  // 主进程调用
  getAppVersion: () => ipcRenderer.invoke(IPCMainChannels.GET_APP_VERSION),

  // 简历相关操作
  getResumes: () => ipcRenderer.invoke(IPCMainChannels.GET_RESUMES),
  getResume: (id: number) => ipcRenderer.invoke(IPCMainChannels.GET_RESUME, id),
  saveResume: (resume: Partial<Resume>) =>
    ipcRenderer.invoke(IPCMainChannels.SAVE_RESUME, resume),
  updateResume: (id: number, resume: Partial<Resume>) =>
    ipcRenderer.invoke(IPCMainChannels.UPDATE_RESUME, id, resume),
  deleteResume: (id: number) =>
    ipcRenderer.invoke(IPCMainChannels.DELETE_RESUME, id),
  refreshSkills: () => ipcRenderer.invoke(IPCMainChannels.REFRESH_SKILLS),
  getResumesByParams: (params: Partial<Resume>) =>
    ipcRenderer.invoke(IPCMainChannels.GET_RESUMES_BY_PARAMS, params),
  getResumesByParamsWithPagination: (
    pageParams: IpcPageParams<Partial<Resume>>
  ) =>
    ipcRenderer.invoke(
      IPCMainChannels.GET_RESUMES_BY_PARAMS_WITH_PAGINATION,
      pageParams
    ),

  // 渲染进程主动发送
  sendLog: (message: string) =>
    ipcRenderer.send(IPCRendererChannels.LOG_EVENT, message),
});
