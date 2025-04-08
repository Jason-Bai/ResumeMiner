import { extractText } from "./extractors";
import { DeepseekService } from "./models/deepseek";

export class ExtractorService {
  private deepseekService: DeepseekService;

  constructor(apiKey: string, baseURL: string) {
    this.deepseekService = new DeepseekService(apiKey, baseURL);
  }

  private extractText(filePath: string) {
    return extractText(filePath);
  }

  async extractResumeInfo(filePath: string) {
    const text = await this.extractText(filePath);

    return this.deepseekService.extractResumeInfo(text);
  }
}
