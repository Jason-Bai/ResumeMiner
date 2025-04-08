import { wrapIpcHandler } from "../utils/response";
import { Key } from "../../database/entities/Key";
import { KeyService } from "../../services/KeyService";

const keyService = new KeyService();

export const handleGetKeys = wrapIpcHandler(
  () => keyService.getAllKeys(),
  "获取Key列表成功",
  "获取Key列表失败",
  []
);

export const handleSaveKey = wrapIpcHandler(
  (_: any, key: Partial<Key>) => keyService.saveKey(key),
  "保存Key成功",
  "保存Key失败",
  undefined
);

export const handleUpdateKey = wrapIpcHandler(
  async (_: any, { id, ...data }: { id: string } & Partial<Key>) =>
    keyService.updateKey(id, data),
  "更新密钥成功",
  "更新密钥失败",
  undefined
);

export const handleDeleteKey = wrapIpcHandler(
  (_: any, id: string) => keyService.deleteKey(id),
  "删除Key成功",
  "删除Key失败",
  undefined
);
