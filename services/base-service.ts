import axios from "~/utils/axios";

export const BaseService = {
  Get: async (url: string) => {
    try {
      const res = await axios.get(url);
      const { success, data, error } = res.data;
      if (success) return [null, data];
      return [error, null];
    } catch (err) {
      return [err, null];
    }
  },
  Post: async (url: string, params: any) => {
    try {
      const res = await axios.post(url, params);
      const { success, data, error } = res.data;
      if (success) return [null, data];
      return [error, null];
    } catch (err) {
      return [err, null];
    }
  },
};
