import axios from "axios";
const loginUrl = "/api/login/signin";
const deleteUrl = "/api/users";
const signupUrl = "/api/signup/register";
const confirmUrl = "/api/signup/confirm";
const resetCodeUrl = "/api/login/resetCode";
const resetPassUrl = "/api/login/resetPass";

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

const reset = async email => {
    const response = await axios.post(resetCodeUrl, email);
    return response.data;
};

const newpass = async credentials => {
    const response = await axios.put(resetPassUrl, credentials);
    return response.data;
};

const remove = async credentials => {
    const response = await axios.delete(deleteUrl+"/"+credentials.user, credentials);
    return response.data;
};

export default { login, register, remove, confirm, reset, newpass };