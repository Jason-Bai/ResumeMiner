import path from "path";
import * as pdf from "./pdf";
import * as word from "./word";

export const extractText = async (filePath: string) => {
  const ext = path.extname(filePath);
  if (ext === ".pdf") {
    return pdf.extractText(filePath);
  }
  if (ext === ".docx") {
    return word.extractText(filePath);
  }
  throw new Error(`Unsupported file type: ${ext}`);
};
