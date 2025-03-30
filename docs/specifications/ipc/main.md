# 主进程 IPC 通信规范

## 响应结构规范

### 统一返回结构

所有 IPC 通信的返回结构必须遵循以下格式：

```typescript
interface IpcResponse<T> {
  // 请求是否成功
  success: boolean;

  // 响应数据
  data: {
    // 状态码：200 表示成功，非 200 表示失败
    code: number;
    // 实际数据：可以是数组或单个对象
    data: T;
  };

  // 响应消息
  message: string;
}
```

### 示例

#### 成功响应

```typescript
{
  success: true,
  data: {
    code: 200,
    data: [/* 数据内容 */]
  },
  message: "操作成功"
}
```

#### 失败响应

```typescript
{
  success: false,
  data: {
    code: 500,
    data: null
  },
  message: "操作失败"
}
```

### 状态码说明

- 200: 成功
- 400: 请求参数错误
- 401: 未授权
- 403: 禁止访问
- 404: 资源不存在
- 500: 服务器内部错误

### 使用规范

1. **错误处理**

   - 所有 IPC 处理函数必须使用 try-catch 包装
   - 错误情况下返回统一的错误响应结构，而不是抛出错误

2. **类型安全**

   - 使用 TypeScript 泛型确保类型安全
   - 为所有 IPC 处理函数定义明确的参数和返回类型

3. **消息规范**
   - success 为 true 时，message 应该是操作成功的描述
   - success 为 false 时，message 应该包含具体的错误信息

### 示例代码

```typescript
const handleGetResumesByParams = async (
  _: any,
  params: Partial<Resume>
): Promise<IpcResponse<Resume[]>> => {
  try {
    const { Resume: resumeRepository } = getRepository();
    const resumes = await resumeRepository.findBy(params);

    return {
      success: true,
      data: {
        code: 200,
        data: resumes,
      },
      message: "获取简历列表成功",
    };
  } catch (error) {
    return {
      success: false,
      data: {
        code: 500,
        data: [],
      },
      message: "获取简历列表失败",
    };
  }
};
```
