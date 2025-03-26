// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// src/main/preload.ts
import { contextBridge, ipcRenderer } from "electron";
import { IPCMainChannels, IPCRendererChannels } from "./ipc/channels";

// 添加日志帮助调试
contextBridge.exposeInMainWorld("electronAPI", {
  // 主进程调用
  getAppVersion: () => ipcRenderer.invoke(IPCMainChannels.GET_APP_VERSION),

  // 渲染进程主动发送
  sendLog: (message: string) =>
    ipcRenderer.send(IPCRendererChannels.LOG_EVENT, message),
});
