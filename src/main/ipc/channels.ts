// src/main/ipc/channels.ts
import { ipcMain, app } from "electron";

export enum IPCMainChannels {
  APP_VERSION = "get-app-version",
  // 其他通道定义...
}

// 使用时通过枚举值而不是字符串
ipcMain.handle(IPCMainChannels.APP_VERSION, () => app.getVersion());
