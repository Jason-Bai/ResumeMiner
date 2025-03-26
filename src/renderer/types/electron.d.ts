import type { Resume } from "../../main/database/entities/Resume";

interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  getResumes: () => Promise<Resume[]>;
  getResume: (id: number) => Promise<Resume>;
  saveResume: (resume: Partial<Resume>) => Promise<Resume>;
  updateResume: (id: number, resume: Partial<Resume>) => Promise<Resume>;
  deleteResume: (id: number) => Promise<void>;
  sendLog: (message: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
