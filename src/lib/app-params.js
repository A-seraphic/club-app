import { getSessionToken } from "@/api/localClient";

export const appParams = {
  get token() {
    return getSessionToken();
  },
};
