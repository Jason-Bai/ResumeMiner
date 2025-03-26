import "reflect-metadata";
import { DataSource } from "typeorm";
import { Resume } from "./entities/Resume";
import { app } from "electron";
import path from "path";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(app.getPath("userData"), "database.sqlite"),
  entities: [Resume],
  synchronize: true,
  logging: true,
});

export const initDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database initialized");
  } catch (error) {
    console.error("Error during database initialization:", error);
  }
};

export const getRepository = () => {
  return {
    Resume: AppDataSource.getRepository(Resume),
  };
};
