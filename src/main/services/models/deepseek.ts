import axios from "axios";

export class DeepseekService {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string, baseURL: string) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  async extractResumeInfo(text: string) {
    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: `请严格按照以下JSON格式提取简历信息，只返回JSON数据。如果某些信息无法提取，请将对应字段设置为空字符串或空数组：
{
    "name": "姓名",
    "gender": "性别",
    "birth_date": "出生日期",
    "education": [
        {
            "school": "学校名称",
            "major": "专业",
            "degree": "学位",
            "period": "就读时间"
        }
    ],
    "experience": [
        {
            "company": "公司名称",
            "position": "职位",
            "period": "工作时间",
            "description": "工作描述"
        }
    ],
    "skills": ["技能1", "技能2"],
    "self_evaluation": "自我评价/个人评价",
    "job_intention": "求职意向",
    "intended_city": "意向城市",
    "certificates": ["证书1", "证书2"]
}

简历文本：`,
            },
            {
              role: "user",
              content: text,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Deepseek API 调用错误:", error);
      throw error;
    }
  }
}
