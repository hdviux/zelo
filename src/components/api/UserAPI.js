import AxiosClient from "../config/AxiosClient";

const UserAPI = {
  profile(token) {
    const url = "/me/profile";
    return AxiosClient.get(url, { headers: { Authorization: token } });
  },
  updateprofile(data,token) {
    const url = "/me/profile";
    return AxiosClient.put(url,data, { headers: { Authorization: token } });
  },
  updateavatar(data,token) {
    const url = "/me/avatar";
    return AxiosClient.patch(url,data, { headers: { Authorization: token,"Content-Type": "multipart/form-data", } });
  },
  changepassword(data,token) {
    const url = "/me/password";
    return AxiosClient.patch(url,data, { headers: { Authorization: token } });
  },
};
export default UserAPI;
