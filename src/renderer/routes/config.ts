import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import KeyList from "../pages/Settings/Key/KeyList";
import PromptList from "../pages/Settings/Prompt/PromptList";
import NotFound from "../pages/NotFound";

export interface RouteConfig {
  path: string;
  name: string;
  icon?: React.ComponentType;
  component: React.ComponentType;
  children?: RouteConfig[];
  hidden?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "首页",
    icon: HomeOutlined,
    component: Home,
  },
  // {
  //   path: "/resumes",
  //   name: "简历管理",
  //   icon: FileOutlined,
  //   component: ResumeList,
  //   children: [
  //     {
  //       path: "/resumes/list",
  //       name: "简历列表",
  //       component: ResumeList,
  //     },
  //     {
  //       path: "/resumes/:id",
  //       name: "简历详情",
  //       component: ResumeDetail,
  //       hidden: true,
  //     },
  //   ],
  // },
  {
    path: "/settings",
    name: "配置管理",
    icon: SettingOutlined,
    component: Settings,
    children: [
      {
        path: "/settings/keys",
        name: "Key列表",
        component: KeyList,
      },
      {
        path: "/settings/prompts",
        name: "Prompt列表",
        component: PromptList,
      },
    ],
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
    hidden: true,
  },
];
