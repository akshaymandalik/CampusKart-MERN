import axios from "axios";

export const signup = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/signup", {
      username: formData.username,
      password: formData.password,
    });
    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      success: false,
      response:
        error.response?.data?.message ||
        error.response?.data?.error[0] ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};
export const signin = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/signin", {
      username: formData.username,
      password: formData.password,
    });

    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.response?.data?.error[0] ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};
