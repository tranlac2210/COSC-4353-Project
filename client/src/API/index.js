import axios from 'axios';

//connects front end to back end, change if needed

export const BASE_URL = 'http://localhost:9000/';

export const ENDPOINTS = {
    USERS: 'users'
};

const usersEndpoint = createAPIEndpoint(ENDPOINTS.USERS);

export const createAPIEndpoint = (endpoint) => {
    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url,newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    };
}