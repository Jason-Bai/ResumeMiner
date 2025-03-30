// 创建一个HomeContext
import { createContext, useContext, Dispatch, SetStateAction } from "react";

export enum Stage {
  Search = "search",
  Show_Result = "show_result",
  Show_Resume_Detail = "show_resume_detail",
}

export interface SearchParams {
  name: string;
  gender: string;
  skills: string[];
}

interface HomeContextType {
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
  resumeId: number | null;
  setResumeId: Dispatch<SetStateAction<number | null>>;
  searchBaseParams: SearchParams;
  setSearchBaseParams: Dispatch<SetStateAction<SearchParams>>;
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  showAdvancedSearch: boolean;
  setShowAdvancedSearch: Dispatch<SetStateAction<boolean>>;
}

export const HomeContext = createContext<HomeContextType>({
  stage: Stage.Search,
  setStage: () => undefined,
  resumeId: null,
  setResumeId: () => undefined,
  searchBaseParams: {
    name: "",
    gender: "",
    skills: [],
  },
  setSearchBaseParams: () => undefined,
  searchParams: {
    name: "",
    gender: "",
    skills: [],
  },
  setSearchParams: () => undefined,
  showAdvancedSearch: false,
  setShowAdvancedSearch: () => undefined,
});

// 添加mode到homeContext
export const useHomeContext = () => {
  return useContext(HomeContext);
};
