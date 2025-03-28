// src/main/ipc/channels.ts
export enum IPCMainChannels {
  GET_APP_VERSION = "get-app-version",
  GET_RESUMES = "get-resumes",
  GET_RESUME = "get-resume",
  SAVE_RESUME = "save-resume",
  UPDATE_RESUME = "update-resume",
  DELETE_RESUME = "delete-resume",
  REFRESH_SKILLS = "refresh-skills",
  // 其他通道...
}

export enum IPCRendererChannels {
  LOG_EVENT = "log-event",
  // 其他通道...
}
