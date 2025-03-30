# 渲染进程 IPC 通信规范

## 调用方式规范

### 统一调用格式

所有渲染进程对主进程的 IPC 调用必须遵循以下格式：

```typescript
interface IpcCallOptions {
  // 超时时间（毫秒）
  timeout?: number;
  // 错误处理回调
  onError?: (error: Error) => void;
}

// 统一调用方法
const ipcCall = async <T>(
  channel: string,
  data?: any,
  options?: IpcCallOptions
): Promise<T> => {
  // 实现代码
};
```

### 使用示例

```typescript
// 调用示例
const getResumes = async (params: Partial<Resume>) => {
  try {
    const response = await ipcCall<IpcResponse<Resume[]>>(
      "get-resumes",
      params,
      {
        timeout: 5000,
        onError: (error) => {
          console.error("获取简历失败:", error);
        },
      }
    );

    if (response.success) {
      return response.data.data;
    }
    throw new Error(response.message);
  } catch (error) {
    // 错误处理
  }
};
```

### 命名规范

1. **通道命名**

   - 使用 kebab-case 命名通道
   - 动词在前，名词在后
   - 例如：`get-resumes`, `create-resume`, `update-resume`

2. **方法命名**
   - 使用 camelCase 命名方法
   - 动词在前，名词在后
   - 例如：`getResumes`, `createResume`, `updateResume`

### 错误处理规范

1. **超时处理**

   - 设置合理的超时时间
   - 超时后自动取消请求
   - 提供超时错误提示

2. **错误回调**
   - 提供统一的错误处理回调
   - 记录错误日志
   - 显示用户友好的错误提示

### 类型安全

1. **参数类型**

   - 定义明确的参数接口
   - 使用 TypeScript 类型检查
   - 避免使用 any 类型

2. **返回值类型**
   - 定义明确的返回值接口
   - 使用泛型确保类型安全
   - 处理可能的空值情况
