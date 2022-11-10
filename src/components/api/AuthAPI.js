import AxiosClient from "../config/AxiosClient";

const AuthAPI = {
  signin(data) {
    const url = "/auth/login";
    return AxiosClient.post(url, {
      employid: data.employid,
      password: data.password,
    });
  },
};
export default AuthAPI;
