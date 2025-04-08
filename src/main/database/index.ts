import "reflect-metadata";
import { DataSource } from "typeorm";
import { Resume } from "./entities/Resume";
import { Key } from "./entities/Key";
import { Prompt } from "./entities/Prompt";
import { app } from "electron";
import path from "path";
import resumeData from "./data/resume.json";
import keyData from "./data/key.json";
import promptData from "./data/prompt.json";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(app.getPath("userData"), "database.sqlite"),
  entities: [Resume, Key, Prompt],
  synchronize: true,
  logging: true,
});

// 私有函数：初始化简历数据
async function initResumeData() {
  const resumeRepository = AppDataSource.getRepository(Resume);
  await resumeRepository.save(resumeData);
}

// 私有函数：初始化简历数据
async function initKeyData() {
  const keyRepository = AppDataSource.getRepository(Key);
  await keyRepository.save(keyData);
}

// 私有函数：初始化提示词数据
async function initPromptData() {
  const promptRepository = AppDataSource.getRepository(Prompt);
  await promptRepository.save(
    promptData.map((prompt) => ({
      ...prompt,
      content: JSON.stringify(prompt.content),
    }))
  );
}

// 私有函数：清理简历数据
async function clearResumeData() {
  const resumeRepository = AppDataSource.getRepository(Resume);
  await resumeRepository.clear();
}

// 私有函数：清理简历数据
async function clearKeyData() {
  const keyRepository = AppDataSource.getRepository(Key);
  await keyRepository.clear();
}

// 私有函数：清理提示词数据
async function clearPromptData() {
  const promptRepository = AppDataSource.getRepository(Prompt);
  await promptRepository.clear();
}

// 公开函数：初始化所有数据
export const initDatabaseData = async () => {
  await initResumeData();

  await initKeyData();

  await initPromptData();
};

// 公开函数：清理所有数据
export const clearDatabaseData = async () => {
  await clearResumeData();
  await clearKeyData();
  await clearPromptData();
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
    Key: AppDataSource.getRepository(Key),
    Prompt: AppDataSource.getRepository(Prompt),
  };
};
