import { SearchParams } from "../pages/Home/HomeContext";
import { Resume } from "../types/resume";
import { ipcInvoke, IpcCallOptions } from "../utils/ipc";

export const handleGetResumesByParams = async (
  params: SearchParams,
  options?: IpcCallOptions
) => {
  const resumes = await ipcInvoke<Resume[]>(
    "getResumesByParams",
    params,
    options
  );
  return resumes;
};

export const handleGetResumesByParamsWithPagination = async (
  params: SearchParams,
  options?: IpcCallOptions
) => {
  const resumes = await ipcInvoke<Resume[]>(
    "getResumesByParamsWithPagination",
    params,
    options
  );
  return resumes;
};
