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
