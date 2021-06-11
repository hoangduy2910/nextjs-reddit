import axios from "~/utils/axios";

export const BaseService = {
  Get: async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      return { success: false, error: err };
    }
  },
  Post: async (url: string, params: any) => {
    try {
      const res = await axios.post(url, params);
      return res.data;
    } catch (err) {
      return { success: false, error: err };
    }
  },
};
