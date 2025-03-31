import { IpcResponse, IpcPageResponse } from "../types";

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

export function createSuccessPageResponse<T>(
  list: T,
  total: number,
  page: number,
  pageSize: number,
  message: string
): IpcPageResponse<T> {
  return {
    success: true,
    data: {
      code: 200,
      data: {
        list,
        total,
        page,
        pageSize,
      },
    },
    message,
  };
}

export function createErrorPageResponse<T>(
  code: number,
  defaultData: T,
  message: string
): IpcPageResponse<T> {
  return {
    success: false,
    data: {
      code,
      data: {
        list: defaultData,
        total: 0,
        page: 0,
        pageSize: 0,
      },
    },
    message,
  };
}

export function wrapIpcPageHandler<T, P = any>(
  handler: (
    event: any,
    params: P
  ) => Promise<{ list: T; total: number; page: number; pageSize: number }>,
  successMessage: string,
  errorMessage: string,
  defaultErrorData: T
): (event: any, params: P) => Promise<IpcPageResponse<T>> {
  return async (event: any, params: P) => {
    try {
      const { list, total, page, pageSize } = await handler(event, params);
      return createSuccessPageResponse(
        list,
        total,
        page,
        pageSize,
        successMessage
      );
    } catch (error) {
      console.error(errorMessage, error);
      return createErrorPageResponse(500, defaultErrorData, errorMessage);
    }
  };
}
