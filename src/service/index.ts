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
  (await http.get<AllItem>("/api/v1/projects/list", { params })).data.data;

//概览
export const overview = async (params: { id: string }) =>
  (await http.get<OverviewData>("/api/v1/projects/statistics", { params })).data
    .data;
//概览下部分
export const OverviewDetails = async (params: {
  project_id: string;
  limit?: string;
  offset?: string;
  prop_order?: "id";
  order?: "desc";
}) =>
  (await http.get<TaskLogData>("/api/v1/task_logs/list", { params })).data.data;

//路由
export const GetRoute = async () =>
  (await http.get<TLayout>("/api/v1/menus/user_menus")).data.data;
