import { PageParams } from "../types/response";
import { SearchParams, Resume } from "../types/resume";
import { ipcInvoke, IpcCallOptions, ipcPageInvoke } from "../utils/ipc";

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

export const handleResumesByParamsWithPagination = async (
  pageParams: PageParams<Partial<Resume>>,
  options?: IpcCallOptions
) => {
  const data = await ipcPageInvoke<Resume[]>(
    "getResumesByParamsWithPagination",
    pageParams,
    options
  );
  return data;
};
