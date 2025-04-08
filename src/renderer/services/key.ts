import { ipcInvoke, IpcCallOptions } from "../utils/ipc";
import { Key } from "../types/key";

export const handleGetKeys = async (
  options?: IpcCallOptions
): Promise<Key[]> => {
  return ipcInvoke("getKeys", undefined, options);
};

export const handleSaveKey = async (
  data: Partial<Key>,
  options?: IpcCallOptions
): Promise<Key> => {
  return ipcInvoke("saveKey", data, options);
};

export const handleUpdateKey = async (
  id: string,
  data: Partial<Key>,
  options?: IpcCallOptions
): Promise<Key> => {
  return ipcInvoke("updateKey", { id, ...data }, options);
};

export const handleDeleteKey = async (
  id: string,
  options?: IpcCallOptions
): Promise<void> => {
  return ipcInvoke("deleteKey", { id }, options);
};
