import { IpcResponse } from "../../main/ipc/types";
export interface IpcCallOptions {
  timeout?: number;
  onError?: (error: Error) => void;
}

/**
 * 统一的 IPC 调用方法
 * @param channel IPC 通道名称
 * @param data 请求参数
 * @param options 调用选项
 * @returns Promise<T> 响应数据
 */
export async function ipcCall<T>(
  channel: string,
  data?: any,
  options: IpcCallOptions = {}
): Promise<T> {
  try {
    const response = (await (
      window.electronAPI[channel as keyof typeof window.electronAPI] as any
    )(data)) as IpcResponse<T>;
    if (!response.success) {
      throw new Error(response.message);
    }
    return response.data.data;
  } catch (error) {
    if (options.onError) {
      options.onError(error as Error);
    }
    throw error;
  }
}

/**
 * 带类型提示的 IPC 调用方法
 * @example
 * const version = await ipcInvoke<string>('getAppVersion');
 * const resumes = await ipcInvoke<Resume[]>('getResumes');
 */
export async function ipcInvoke<T>(
  channel: string,
  data?: any,
  options?: IpcCallOptions
): Promise<T> {
  return ipcCall<T>(channel, data, options);
}
