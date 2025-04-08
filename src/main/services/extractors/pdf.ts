import fs from "fs";
import pdf from "pdf-parse";

export const extractText = async (filePath: string) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("PDF 解析错误:", error);
    throw error;
  }
};
