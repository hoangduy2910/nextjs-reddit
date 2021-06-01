import { BaseService } from "./base-service";

export const UserService = {
  Register: async (registerForm) => {
    return await BaseService.Post("/user/register", registerForm);
  },
};
