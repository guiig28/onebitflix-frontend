import api from "./api";

interface UserParams {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createdAt: string;
}

interface PasswordParams {
  currentPassword: string;
  newPassword: string;
}

const profileService = {
  fetchCurrent: async () => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .get("/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response?.data.message);

        return err.response;
      });

    return res.data;
  },

  userUpdate: async (params: UserParams) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .put("/users/current", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err.response?.status === 400 || err.response?.status === 401) {
          return err.response;
        }

        return err;
      });

    return res.status;
  },

  passwordUpdate: async (params: PasswordParams) => {
    const token = sessionStorage.getItem("onebitflix-token");

    const res = await api
      .put("/users/current/password", params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 401) {
          return err.response;
        }

        return err;
      });

    return res.status;
  },
};

export default profileService;
