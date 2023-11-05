import axios from "axios";
const baseUrl = "api/recipes";
const myRecUrl = "api/recipes/myrecipes";

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const getMy = (user) => {
    const request = axios.get(`${myRecUrl}?username=${user}`);
    return request.then(response => response.data);
};

const remove = async name => {
    const response = await axios.delete(`/${myRecUrl}/${name}`);
    return response.data;
};

const update = async objectToUpdate => {
    const response = await axios.put(`/${myRecUrl}/${objectToUpdate.oldName}`, objectToUpdate);
    return response.data;
};


export default { getAll, create, setToken, getMy, update, remove };