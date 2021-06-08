import { BaseService } from "./base-service";

export const UserService = {
  Register: async (registerForm: {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
  }) => {
    return await BaseService.Post("/user/register", registerForm);
  },
  Login: async (loginForm: { userName: string; password: string }) => {
    return await BaseService.Post("/user/login", loginForm);
  },
};
