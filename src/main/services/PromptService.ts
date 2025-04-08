import { getRepository } from "../database";
import { Prompt } from "../database/entities/Prompt";

export class PromptService {
  private get promptRepository() {
    return getRepository().Prompt;
  }

  async getAllPrompts(): Promise<Prompt[]> {
    return await this.promptRepository.find();
  }

  async savePrompt(prompt: Partial<Prompt>): Promise<Prompt> {
    return await this.promptRepository.save(prompt);
  }

  async updatePrompt(id: string, prompt: Partial<Prompt>): Promise<void> {
    await this.promptRepository.update(id, prompt);
  }

  async deletePrompt(id: string): Promise<void> {
    await this.promptRepository.delete(id);
  }
}
