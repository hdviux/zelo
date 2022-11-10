import AxiosClient from "../config/AxiosClient";

const AdminAPI = {
  getlistuser(token) {
    const url = "/admin/users-manager?page=0&size=999999";
    return AxiosClient.get(url, { headers: { Authorization: token } });
  },
};
export default AdminAPI;