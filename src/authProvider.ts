import { AuthBindings } from "@refinedev/core";
import {axiosInstance} from "./rest-data-provider/utils";
import {API_URL} from "./rest-data-provider";

export const TOKEN_KEY = "dienstduizend-auth";


export const authProvider: AuthBindings = {
  login: async ({ email, password, oneTimePassword }) => {

  try {
    const response = await axiosInstance.post(`${API_URL}/authentication/login`, {
      email,
      password,
      oneTimePassword: oneTimePassword == "" ? null : oneTimePassword,
    }, {withCredentials: true})

    localStorage.setItem(TOKEN_KEY, response.data.accessToken);

    return {
      success: true,
      result: "/",
    };

  } catch (e: any) {

    return {
      success: false,
      error: {
        name: e.response?.data.detail,
        message: "Failed to login.",
      },
    };
  }

  },
  register: async ({ email, password, confirmPassword, firstName, lastName, acceptedTermsOfService }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/authentication/register`, {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        acceptedTermsOfService
      });

      return {
        success: true,
        result: "/login",
        successNotification: {
          message: response.data.message,
          description: "Created account",
        }
      };

    } catch (e: any) {

      return {
        success: false,
        error: {
          name: e.response?.data.detail,
          message: "Failed to login.",
        },
      };
    }

  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
