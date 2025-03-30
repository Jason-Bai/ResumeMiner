import { HomeOutlined, FileOutlined } from "@ant-design/icons";
import Home from "../pages/Home";
import ResumeList from "../pages/ResumeList";
import ResumeDetail from "../pages/Resume/Detail";
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
    path: "*",
    name: "404",
    component: NotFound,
    hidden: true,
  },
];
