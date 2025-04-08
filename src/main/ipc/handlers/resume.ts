import { wrapIpcHandler, wrapIpcPageHandler } from "../utils/response";
import { IpcPageParams } from "../types";
import { ResumeService } from "../../services/ResumeService";
import { Resume } from "../../database/entities/Resume";

const resumeService = new ResumeService();

export const handleGetResumes = wrapIpcHandler(
  () => resumeService.getAllResumes(),
  "获取简历列表成功",
  "获取简历列表失败",
  []
);

export const handleGetResume = wrapIpcHandler(
  (_: any, id: string) => resumeService.getResumeById(parseInt(id)),
  "获取简历详情成功",
  "获取简历详情失败",
  null
);

export const handleGetResumesByParams = wrapIpcHandler(
  (_: any, params: any) => resumeService.searchResumes(params),
  "获取简历列表成功",
  "获取简历列表失败",
  []
);

export const handleGetResumesByParamsWithPagination = wrapIpcPageHandler<
  Resume[]
>(
  (_: any, pageParams: any) =>
    resumeService.searchResumesWithPagination(pageParams),
  "获取简历列表成功",
  "获取简历列表失败",
  []
);
