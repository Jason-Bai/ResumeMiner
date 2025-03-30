import { IpcResponse } from "../types";

export function createSuccessResponse<T>(
  data: T,
  message: string
): IpcResponse<T> {
  return {
    success: true,
    data: {
      code: 200,
      data,
    },
    message,
  };
}

export function createErrorResponse<T>(
  defaultData: T,
  message: string
): IpcResponse<T> {
  return {
    success: false,
    data: {
      code: 500,
      data: defaultData,
    },
    message,
  };
}

export function wrapIpcHandler<T, P = any>(
  handler: (event: any, params: P) => Promise<T>,
  successMessage: string,
  errorMessage: string,
  defaultErrorData: T
): (event: any, params: P) => Promise<IpcResponse<T>> {
  return async (event: any, params: P) => {
    try {
      const data = await handler(event, params);
      return createSuccessResponse(data, successMessage);
    } catch (error) {
      console.error(errorMessage, error);
      return createErrorResponse(defaultErrorData, errorMessage);
    }
  };
}
