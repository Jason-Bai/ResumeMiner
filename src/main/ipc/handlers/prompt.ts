import { wrapIpcHandler } from "../utils/response";
import { Prompt } from "../../database/entities/Prompt";
import { PromptService } from "../../services/PromptService";

const promptService = new PromptService();

export const handleGetPrompts = wrapIpcHandler(
  () => promptService.getAllPrompts(),
  "获取提示词列表成功",
  "获取提示词列表失败",
  []
);

export const handleSavePrompt = wrapIpcHandler(
  (_: any, prompt: Partial<Prompt>) => promptService.savePrompt(prompt),
  "保存提示词成功",
  "保存提示词失败",
  undefined
);

export const handleUpdatePrompt = wrapIpcHandler(
  (_: any, params: { id: string; prompt: Partial<Prompt> }) =>
    promptService.updatePrompt(params.id, params.prompt),
  "更新提示词成功",
  "更新提示词失败",
  undefined
);

export const handleDeletePrompt = wrapIpcHandler(
  (_: any, id: string) => promptService.deletePrompt(id),
  "删除提示词成功",
  "删除提示词失败",
  undefined
);
