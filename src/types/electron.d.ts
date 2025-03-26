import type { Resume } from "../main/database/entities/Resume";

declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>;
      getResumes: () => Promise<Resume[]>;
      getResume: (id: number) => Promise<Resume | null>;
      saveResume: (resume: Partial<Resume>) => Promise<Resume>;
      updateResume: (
        id: number,
        resume: Partial<Resume>
      ) => Promise<Resume | null>;
      deleteResume: (id: number) => Promise<boolean>;
    };
  }
}
