import axios from "axios";
const loginUrl = "/api/login";
const signupUrl = "/api/signup/register";
const confirmUrl = "/api/signup/confirm";

const login = async credentials => {
    const response = await axios.post(loginUrl, credentials);
    return response.data;
};

const register = async credentials => {
    const response = await axios.post(signupUrl, credentials);
    return response.data;
};

const confirm = async credentials => {
    const response = await axios.post(confirmUrl, credentials);
    return response.data;
};

const remove = async credentials => {
    console.log(credentials);
    const response = await axios.delete(signupUrl+"/"+credentials.user.username, credentials);
    return response.data;
};

export default { login, register, remove, confirm };