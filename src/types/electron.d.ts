import type { Resume } from "../main/database/entities/Resume";
import type { Key } from "../main/database/entities/Key";
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
      getKeys: () => Promise<Key[]>;
      saveKey: (key: Partial<Key>) => Promise<Key>;
      updateKey: (id: string, key: Partial<Key>) => Promise<Key | null>;
      deleteKey: (id: string) => Promise<boolean>;
    };
  }
}
