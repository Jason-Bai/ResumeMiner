import { app, ipcMain } from "electron";
import { IPCMainChannels, IPCRendererChannels } from "./channels";
import { getRepository } from "../database";

// 处理获取版本请求
const handleGetAppVersion = async () => {
  try {
    return await app.getVersion();
  } catch (error) {
    console.error("Version check failed:", error);
    throw new Error("VERSION_CHECK_FAILED");
  }
};

// 获取所有简历
const handleGetResumes = async () => {
  try {
    const { Resume: resumeRepository } = getRepository();
    return await resumeRepository.find();
  } catch (error) {
    console.error("Failed to get resumes:", error);
    throw new Error("FAILED_TO_GET_RESUMES");
  }
};

// 获取单个简历
const handleGetResume = async (_: any, id: string) => {
  try {
    const { Resume: resumeRepository } = getRepository();
    return await resumeRepository.findOneBy({ id: parseInt(id) });
  } catch (error) {
    console.error("Failed to get resume:", error);
    throw new Error("FAILED_TO_GET_RESUME");
  }
};

// 处理日志事件
const handleLogEvent = (_: any, message: string) => {
  console.log("[Renderer Log]:", message);
};

// 注册所有 IPC 处理器
export function registerIPC() {
  // 版本相关
  ipcMain.handle(IPCMainChannels.GET_APP_VERSION, handleGetAppVersion);

  // 简历相关
  ipcMain.handle(IPCMainChannels.GET_RESUMES, handleGetResumes);
  ipcMain.handle(IPCMainChannels.GET_RESUME, handleGetResume);

  // 日志相关
  ipcMain.on(IPCRendererChannels.LOG_EVENT, handleLogEvent);
}
