import { getRepository } from "../database";
import { Resume } from "../database/entities/Resume";
import { FindOptionsWhere, Like, Raw } from "typeorm";
import { IpcPageParams } from "../ipc/types";

export class ResumeService {
  private get resumeRepository() {
    return getRepository().Resume;
  }

  async getAllResumes(): Promise<Resume[]> {
    return await this.resumeRepository.find();
  }

  async getResumeById(id: number): Promise<Resume | null> {
    return await this.resumeRepository.findOneBy({ id });
  }

  async searchResumes(params: Partial<Resume>): Promise<Resume[]> {
    const where = this.buildSearchConditions(params);
    return await this.resumeRepository.findBy(where);
  }

  async searchResumesWithPagination(
    pageParams: IpcPageParams<Partial<Resume>>
  ): Promise<{
    list: Resume[];
    total: number;
    page: number;
    pageSize: number;
  }> {
    const { params, sort, page = 1, pageSize = 10 } = pageParams;
    const where = this.buildSearchConditions(params);

    const [list, total] = await this.resumeRepository.findAndCount({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { [sort.field]: sort.order },
    });

    return { list, total, page, pageSize };
  }

  private buildSearchConditions(
    params: Partial<Resume>
  ): FindOptionsWhere<Resume> {
    const where: FindOptionsWhere<Resume> = {};

    if (params.name) {
      where.name = Like(`%${params.name}%`);
    }

    if (params.gender) {
      where.gender = params.gender;
    }

    if (params.skills && params.skills.length > 0) {
      where.skills = Raw((alias: string) => {
        const conditions = (params.skills || []).map(
          (skill) => `${alias} LIKE '%${skill}%'`
        );
        return conditions.join(" OR ");
      });
    }

    return where;
  }
}
