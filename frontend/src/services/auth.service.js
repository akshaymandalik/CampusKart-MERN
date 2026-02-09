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
      response:
        error.response?.data?.message ||
        error.response?.data?.error[0] ||
        "Something went wrong",
      status: error.response?.status,
    };
  }
};

export const isUserExist = async (username) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/isUserExist",
      {
        username,
      },
    );
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

export const verifyOtp = async (otp) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/verifyOtp",
      {
        otp,
      },
    );
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

export const updateUserPass = async (formData) => {
  console.log(formData, "formdata");

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/updateUserPass",
      {
        username: formData.username,
        password: formData.password,
      },
    );
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