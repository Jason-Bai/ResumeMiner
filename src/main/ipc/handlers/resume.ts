import { getRepository } from "../../database";
import { Resume } from "../../database/entities/Resume";
import { FindOptionsWhere, In, Like, Raw } from "typeorm";
import { wrapIpcHandler } from "../utils/response";
import { IpcResponse, PageParams } from "../types";

// 获取所有简历
const getResumes = async () => {
  const { Resume: resumeRepository } = getRepository();
  return await resumeRepository.find();
};

export const handleGetResumes = wrapIpcHandler(
  getResumes,
  "获取简历列表成功",
  "获取简历列表失败",
  []
);

// 获取单个简历
const getResume = async (_: any, id: string) => {
  const { Resume: resumeRepository } = getRepository();
  return await resumeRepository.findOneBy({ id: parseInt(id) });
};

export const handleGetResume = wrapIpcHandler(
  getResume,
  "获取简历详情成功",
  "获取简历详情失败",
  null
);

// 处理获取简历请求，根据条件查询，其中name需要模糊搜索，其他参数没有不要添加到查询条件中
const getResumesByParams = async (_: any, params: Partial<Resume>) => {
  const { Resume: resumeRepository } = getRepository();

  // 构建查询条件
  const whereConditions: FindOptionsWhere<Resume> = {};

  // name 参数使用 Like 进行模糊搜索
  if (params.name) {
    whereConditions.name = Like(`%${params.name}%`);
  }

  // 性别精确匹配
  if (params.gender) {
    whereConditions.gender = params.gender;
  }

  // 技能匹配 - 使用 JSON 数组包含检查
  if (params.skills && params.skills.length > 0) {
    // 修改为skills like '%skill[0]%' or skills like '%skill[1]%' or ...
    // 使用 OR 连接每个技能
    whereConditions.skills = Raw(
      (alias) =>
        `${params.skills
          ?.map((skill) => `${alias} LIKE '%${skill}%'`)
          .join(" OR ")}`
    );
  }

  return await resumeRepository.findBy(whereConditions);
};

export const handleGetResumesByParams = wrapIpcHandler(
  getResumesByParams,
  "获取简历列表成功",
  "获取简历列表失败",
  []
);

// 处理获取简历分页请求，根据条件查询
const getResumesByParamsWithPagination = async (
  _: any,
  pageParams: PageParams<Partial<Resume>>
) => {
  const { Resume: resumeRepository } = getRepository();

  // 构建查询条件
  const whereConditions: FindOptionsWhere<Resume> = {};

  const { params, sort } = pageParams;

  // name 参数使用 Like 进行模糊搜索
  if (params.name) {
    whereConditions.name = Like(`%${params.name}%`);
  }

  // 性别精确匹配
  if (params.gender) {
    whereConditions.gender = params.gender;
  }

  // 技能匹配 - 使用 JSON 数组包含检查
  if (params.skills && params.skills.length > 0) {
    // 修改为skills like '%skill[0]%' or skills like '%skill[1]%' or ...
    // 使用 OR 连接每个技能
    whereConditions.skills = Raw(
      (alias) =>
        `${params.skills
          ?.map((skill) => `${alias} LIKE '%${skill}%'`)
          .join(" OR ")}`
    );
  }

  // 分页查询
  const [page, pageSize] = [pageParams.page || 1, pageParams.pageSize || 10];
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const [resumes, total] = await resumeRepository.findAndCount({
    where: whereConditions,
    skip,
    take,
    order: { [sort.field]: sort.order },
  });

  return {
    total,
    page,
    pageSize,
    data: resumes,
  };
};

export const handleGetResumesByParamsWithPagination = wrapIpcHandler(
  getResumesByParamsWithPagination,
  "获取简历列表成功",
  "获取简历列表失败",
  {
    total: 0,
    page: 1,
    pageSize: 10,
    data: [],
  }
);
