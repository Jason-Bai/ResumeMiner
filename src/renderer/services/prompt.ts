import { Prompt } from "../types/prompt";
import { ipcInvoke, IpcCallOptions } from "../utils/ipc";

export const handleGetPrompts = async (options?: IpcCallOptions) => {
  const prompts = await ipcInvoke<Prompt[]>("getPrompts", {}, options);
  return prompts;
};

export const handleSavePrompt = async (
  prompt: Partial<Prompt>,
  options?: IpcCallOptions
) => {
  const savedPrompt = await ipcInvoke<Prompt>("savePrompt", prompt, options);
  return savedPrompt;
};

export const handleUpdatePrompt = async (
  id: string,
  prompt: Partial<Prompt>,
  options?: IpcCallOptions
) => {
  await ipcInvoke<void>("updatePrompt", { id, prompt }, options);
};

export const handleDeletePrompt = async (
  id: string,
  options?: IpcCallOptions
) => {
  await ipcInvoke<void>("deletePrompt", id, options);
};
