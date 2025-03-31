import { PaginationParams, SortParams } from "../types/response";

// Type definitions based on the Resume entity in the main process
export interface Education {
  school: string;
  major: string;
  degree: string;
  period: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Resume {
  id: number;
  name: string;
  gender?: string; // Optional based on nullable: true
  birth_date?: string; // Optional based on nullable: true
  education?: Education[]; // Optional based on nullable: true
  experience?: Experience[]; // Optional based on nullable: true
  skills?: string[]; // Optional based on nullable: true
  self_evaluation?: string; // Optional based on nullable: true
  job_intention?: string; // Optional based on nullable: true
  intended_city?: string; // Optional based on nullable: true
  certificates?: string[]; // Optional based on nullable: true
  createdAt: string; // Dates are often serialized as strings in IPC
  updatedAt: string; // Dates are often serialized as strings in IPC
}

// Existing types
export interface SearchParams {
  name: string;
  gender: string;
  skills: string[];
}

export enum Stage {
  Search = "search",
  Show_Result = "show_result",
  Show_Resume_Detail = "show_resume_detail",
}

export interface SearchPageParams<T> extends PaginationParams {
  params: T;
  sort: SortParams;
}
