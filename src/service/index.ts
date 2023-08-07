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
//头部
export const userInformation = async () =>
  (await http.get<TUserInformation>("/api/v1/users/user_info")).data;
// 项目模板
export const featProject_templates = async (params: {
  is_custom: number;
  limit: number;
  offset: number;
}) =>
  (
    await http.get<ResponseDataRows>("/api/v1/project_templates/list", {
      params,
    })
  ).data.data.rows;
// 全部项目
export const featProjectsList = async (
  params:
    | { collection: number; is_recycle: number }
    | { collection: number; is_archived: number }
) =>
  (
    await http.get<ResponseDataRows>("/api/v1/projects/list", {
      params,
    })
  ).data.data.rows;
// 收藏
export const feat_project_collects = async (data: {
  project_id: number | undefined;
  user_id: 56;
}) =>
  (await http.post<IBaseResponse>("/api/v1/user_project_collects/change", data))
    .data.data;
// 上传图片
export const upLoadFileRecord = async (data: FormData) =>
  (
    await http.post<ResponseData_1>("/api/v1/uploads", data, {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    })
  ).data.data;
// 修改项目信息
export const project_templatesList = async (params: {
  limit: number;
  offset: number;
}) =>
  (
    await http.get<Project_templatesList>("/api/v1/project_templates/list", {
      params,
    })
  ).data.data.rows;
// 个人信息
export const featUser_info = async () =>
  (await http.get<TUser_info>("/api/v1/users/user_info")).data.data;
// 修改项目信息
export const ModifyProjectInformation = async (data: TsungCurrentData) =>
  await http.put<IBaseResponse>("/api/v1/projects", data);
// 部门
export const DepartmentInf = async (params: {
  keyword: string;
  department_id?: number;
  state?: number;
  date_after_created?: string;
}) =>
  (await http.get<TDepartmentInformation>("/api/v1/users/list", { params }))
    .data.data.rows;

// 部门名称
export const DepartmentName = async () =>
  (await http.get<TDepartmentInformation>("api/v1/departments/list")).data.data;

//成员详情
export const DepartmentUSerInf = async (params: { id: number }) =>
  (await http.get<TDepartmentInformation>("api/v1/users?", { params })).data
    .data;

//启用禁用
export const isEnableDisable = async (data: { id: number; state: 0 | 1 }) =>
  await http.put("api/v1/users", data);

// 部门修改排序
export const DepartmentSort = async (data: {
  id: number;
  name: string;
  sort: number;
  owner_id?: number;
  parent_id?: number;
  created_at?: string;
  updated_at?: string;
}) => await http.put("api/v1/departments", data);
