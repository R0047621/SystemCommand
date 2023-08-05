import http from "@/utils/http";

export const isUserExists = async (
  params: { username: string } | { email: string }
) =>
  (
    await http.get<IBaseResponse>("/api/v1/users/exists_user_unique_fields", {
      params,
    })
  ).data.code;
export const sendVerificationCodes = async (data: {
  target: string;
  type: 1;
}) =>
  (await http.post<IBaseResponse>("/api/v1/verification_codes", data)).data
    .code;

export const register = async (data: {
  avatar: string;
  code: string;
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  verification_type: 1;
}) => (await http.post("/api/v1/users", data)).data.code;

//登录
export const isUsersLogin = async (data: {
  username: string;
  password: string;
}) => (await http.post<TLoginResponse>("/api/v1/users/login", data)).data.code;
// 重置密码
export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
}) => (await http.put<IBaseResponse>("/api/v1/users/password", data)).data.code;

//所有项目
export const allItem = async (params: { limit: string }) =>
  (await http.get<TAllItem>("/api/v1/projects/list", { params })).data.data;

//概览
export const overview = async (params: { id: string }) =>
  (await http.get<TOverviewData>("/api/v1/projects/statistics", { params }))
    .data.data;
//概览下部分
export const OverviewDetails = async (params: {
  project_id: string;
  limit?: string;
  offset?: string;
  prop_order?: "id";
  order?: "desc";
}) =>
  (await http.get<TaskLogData>("/api/v1/task_logs/list", { params })).data.data;

//菜单路由
export const GetUserMenus = async () =>
  (await http.get<TLayout>("/api/v1/menus/user_menus")).data.data;

// 首页导航项目请求数据
export const getProjectsData = async (params: {
  collection: number;
  is_recycle: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data;

// 首页已归档项目
export const getArchivedProjectsData = async (params: {
  collection: number;
  is_archived: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data;

// 首页回收站
export const getRecycleBinData = async (params: {
  collection: number;
  is_recycle: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data;

//我的收藏
export const getMyColectData = async (params: {
  collection: number;
  is_recycle: number;
}) =>
  (
    await http.get<getProjectData>("api/v1/projects/list", {
      params,
    })
  ).data;

// 项目模板
export const getProjectTemplateData = async (params: {
  is_custom: number;
  limit: number;
  offset: number;
}) =>
  (
    await http.get<getProjectTemplateData>("api/v1/project_templates/list", {
      params,
    })
  ).data;

// 项目模板公共模板
export const getCommonTemplateData = async (params: {
  is_custom: number;
  limit: number;
  offset: number;
}) =>
  (
    await http.get<getProjectTemplateData>("api/v1/project_templates/list", {
      params,
    })
  ).data.data.rows;
