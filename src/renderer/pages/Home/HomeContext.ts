// 创建一个HomeContext
import { PageResponseData } from "@/renderer/types/response";
import {
  Resume,
  SearchPageParams,
  SearchParams,
  Stage,
} from "@/renderer/types/resume";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface HomeContextType {
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
  resumeId: number | null;
  setResumeId: Dispatch<SetStateAction<number | null>>;
  showAdvancedSearch: boolean;
  setShowAdvancedSearch: Dispatch<SetStateAction<boolean>>;
  searchPageBaseParams: SearchPageParams<SearchParams>;
  setSearchPageBaseParams: Dispatch<
    SetStateAction<SearchPageParams<SearchParams>>
  >;
  searchPageParams: SearchPageParams<SearchParams>;
  setSearchPageParams: Dispatch<SetStateAction<SearchPageParams<SearchParams>>>;
  resumePageData: PageResponseData<Resume[]>;
  setResumePageData: Dispatch<SetStateAction<PageResponseData<Resume[]>>>;
}

export const HomeContext = createContext<HomeContextType>({
  stage: Stage.Search,
  setStage: () => undefined,
  resumeId: null,
  setResumeId: () => undefined,
  showAdvancedSearch: false,
  setShowAdvancedSearch: () => undefined,
  searchPageBaseParams: {
    params: {
      name: "",
      gender: "",
      skills: [],
    },
    sort: {
      field: "updatedAt",
      order: "desc",
    },
    page: 1,
    pageSize: 10,
  },
  setSearchPageBaseParams: () => undefined,
  searchPageParams: {
    params: {
      name: "",
      gender: "",
      skills: [],
    },
    sort: {
      field: "updatedAt",
      order: "desc",
    },
    page: 1,
    pageSize: 10,
  },
  setSearchPageParams: () => undefined,
  resumePageData: {
    list: [],
    total: 0,
    page: 1,
    pageSize: 10,
  },
  setResumePageData: () => undefined,
});
// 添加mode到homeContext
export const useHomeContext = () => {
  return useContext(HomeContext);
};
