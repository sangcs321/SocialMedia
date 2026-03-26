import { apiRequest } from "api/apiService";

export const UserApiService = {
  getUsers: () =>
    apiRequest<any>({
      url: "/api/user",
      method: "GET",
    }),
  getMe: () =>
    apiRequest<any>({
      url: "/api/user/me",
      method: "GET",
    }),
};
