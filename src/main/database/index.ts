import "reflect-metadata";
import { DataSource } from "typeorm";
import { Resume } from "./entities/Resume";
import { app } from "electron";
import path from "path";
import resumeData from "./data/resume.json";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(app.getPath("userData"), "database.sqlite"),
  entities: [Resume],
  synchronize: true,
  logging: true,
});

// 私有函数：初始化简历数据
async function initResumeData() {
  const resumeRepository = AppDataSource.getRepository(Resume);
  await resumeRepository.save(resumeData);
}

// 私有函数：清理简历数据
async function clearResumeData() {
  const resumeRepository = AppDataSource.getRepository(Resume);
  await resumeRepository.clear();
}

// 公开函数：初始化所有数据
export const initDatabaseData = async () => {
  await initResumeData();
};

// 公开函数：清理所有数据
export const clearDatabaseData = async () => {
  await clearResumeData();
};

// 初始化数据库连接
export const initDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database initialized");
  } catch (error) {
    console.error("Error during database initialization:", error);
  }
};

// 获取数据库仓库
export const getRepository = () => {
  return {
    Resume: AppDataSource.getRepository(Resume),
  };
};
