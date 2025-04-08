import mammoth from "mammoth";

export const extractText = async (filePath: string) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error("DOCX 解析错误:", error);
    throw error;
  }
};
