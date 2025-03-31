import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import { HomeContext } from "./HomeContext";
import HomeContent from "./HomeContent";
import ResumeDetail from "../Resume/Detail";
import { ipcInvoke } from "../../utils/ipc";
import {
  Stage,
  SearchParams,
  SearchPageParams,
  Resume,
} from "../../types/resume";
import { PageResponseData } from "@/renderer/types/response";

const Home: React.FC = () => {
  const [version, setVersion] = useState<string>("");
  const [stage, setStage] = useState<Stage>(Stage.Search);
  const [resumeId, setResumeId] = useState<number | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const [searchPageBaseParams, setSearchPageBaseParams] = useState<
    SearchPageParams<SearchParams>
  >({
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
  });
  const [searchPageParams, setSearchPageParams] = useState<
    SearchPageParams<SearchParams>
  >({
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
  });
  const [resumePageData, setResumePageData] = useState<
    PageResponseData<Resume[]>
  >({
    list: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  useEffect(() => {
    ipcInvoke<string>("getAppVersion")
      .then((version) => {
        setVersion(version);
      })
      .catch((error) => {
        console.error("获取版本失败:", error);
      });
  }, []);

  return (
    <HomeContext.Provider
      value={{
        stage,
        setStage,
        resumeId,
        setResumeId,
        showAdvancedSearch,
        setShowAdvancedSearch,
        searchPageBaseParams,
        setSearchPageBaseParams,
        searchPageParams,
        setSearchPageParams,
        resumePageData,
        setResumePageData,
      }}
    >
      <div>
        {/* 版本号显示 */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            color: "#666",
            fontSize: "14px",
          }}
        >
          <p style={{ margin: 0 }}>当前版本：{version}</p>
        </div>
      </div>
      {stage === Stage.Search && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 使用 HomeHeader 组件 */}
          <HomeHeader />
        </div>
      )}

      {stage === Stage.Show_Result && (
        <div>
          {/* 使用 HomeHeader 组件 */}
          <HomeHeader />
          <HomeContent />
        </div>
      )}

      {stage === Stage.Show_Resume_Detail && <ResumeDetail />}
    </HomeContext.Provider>
  );
};

export default Home;
