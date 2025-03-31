# IPC 类型定义规范

## 基础类型定义

### 响应类型

```typescript
// 通用响应类型
interface IpcResponse<T> {
  success: boolean;
  data: {
    code: number;
    data: T;
  };
  message: string;
}

// 分页响应类型
interface IpcPageResponse<T> extends IpcResponse<T> {
  data: {
    code: number;
    data: T;
    total: number;
    page: number;
    pageSize: number;
  };
}
```

### 请求类型

```typescript
// 分页请求参数
interface IpcPageParams {
  page: number;
  pageSize: number;
}

// 排序参数
interface IpcSortParams {
  field: string;
  order: "asc" | "desc";
}
```

## 通道类型定义

### 通道枚举

```typescript
enum IpcChannel {
  // 简历相关
  GET_RESUMES = "get-resumes",
  GET_RESUME = "get-resume",
  CREATE_RESUME = "create-resume",
  UPDATE_RESUME = "update-resume",
  DELETE_RESUME = "delete-resume",

  // 技能相关
  GET_SKILLS = "get-skills",
  CREATE_SKILL = "create-skill",
  UPDATE_SKILL = "update-skill",
  DELETE_SKILL = "delete-skill",

  // 分类相关
  GET_CATEGORIES = "get-categories",
  CREATE_CATEGORY = "create-category",
  UPDATE_CATEGORY = "update-category",
  DELETE_CATEGORY = "delete-category",
}
```

### 通道参数类型

```typescript
// 通道参数类型映射
type IpcChannelParams = {
  [IpcChannel.GET_RESUMES]: IpcPageParams;
  [IpcChannel.GET_RESUME]: { id: number };
  [IpcChannel.CREATE_RESUME]: Omit<Resume, "id">;
  [IpcChannel.UPDATE_RESUME]: Partial<Resume>;
  [IpcChannel.DELETE_RESUME]: { id: number };
  // ... 其他通道参数类型
};
```

### 通道响应类型

```typescript
// 通道响应类型映射
type IpcChannelResponse = {
  [IpcChannel.GET_RESUMES]: IpcPageResponse<Resume[]>;
  [IpcChannel.GET_RESUME]: IpcResponse<Resume>;
  [IpcChannel.CREATE_RESUME]: IpcResponse<Resume>;
  [IpcChannel.UPDATE_RESUME]: IpcResponse<Resume>;
  [IpcChannel.DELETE_RESUME]: IpcResponse<void>;
  // ... 其他通道响应类型
};
```

## 使用示例

```typescript
// 类型安全的 IPC 调用
const getResumes = async (params: IpcChannelParams[IpcChannel.GET_RESUMES]) => {
  const response = await ipcCall<IpcChannelResponse[IpcChannel.GET_RESUMES]>(
    IpcChannel.GET_RESUMES,
    params
  );
  return response;
};

// 类型安全的 IPC 处理
const handleGetResumes = async (
  _: any,
  params: IpcChannelParams[IpcChannel.GET_RESUMES]
): Promise<IpcChannelResponse[IpcChannel.GET_RESUMES]> => {
  // 实现代码
};
```
