export interface Resume {
  id: number;
  name: string;
  gender: string;
  birth_date: string;
  education: {
    school: string;
    major: string;
    degree: string;
    period: string;
  }[];
  experience: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  skills: string[];
  self_evaluation: string;
  job_intention: string;
  intended_city: string;
  certificates: string[];
  updatedAt: string;
}
