// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// src/main/preload.ts
import { contextBridge, ipcRenderer } from "electron";

// 添加日志帮助调试
contextBridge.exposeInMainWorld("electronAPI", {
  getAppVersion: async () => {
    try {
      const version = await ipcRenderer.invoke("get-version");
      console.log("Preload: Version fetched:", version);
      return version;
    } catch (error) {
      console.error("Preload: Error fetching version:", error);
      return "Error";
    }
  },
});
