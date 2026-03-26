import { apiRequest } from "api/apiService";
import React from "react";

export const AuthApiService = {
  login: (email: string, password: string) =>
    apiRequest<any>({
      url: "/api/auth/login",
      method: "POST",
      data: {
        email: email,
        password: password,
      },
    }),
};
