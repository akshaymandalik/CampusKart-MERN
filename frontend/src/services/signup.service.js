import axios from "axios";
export const signup = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/user/signup", {
      username: formData.username,
      password: formData.password,
    });      
    return response.data;
  } catch (error) {

      return {
          status:500,
          error: true,
          message:
           error.response?.data?.message ||"Something went wrong, Please try again"
        }
  }
};
