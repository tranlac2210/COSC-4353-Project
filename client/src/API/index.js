import axios from 'axios';

//connects front end to back end, change if needed

export const BASE_URL = 'http://localhost:9000/';

export const ENDPOINTS = {
    /*-----------------USER------------*/
    USERS: 'user',
    UserSignIn: 'user/signin', // POST: User Sign in
    UserSignUp: 'user/signup', // POST: User Sign up
    GetUser: 'user/getUser', // GET: Get User by ID
    GetUsers: 'user/getUsers', // GET: Get all Users
    UserInfoChange: 'user/UserInfoChange', // GET: Get User info by ID
    UserPasswordChange: 'user/passwordChange', // PUT: Change user password 

    /*-----------------ADMIN------------*/
    AdminSignUp: 'admin/signup', // POST: Admin Sign up
    AdminSignIn: 'admin/signin', // POST: Admin Sign in
    AdminGetClients: 'admin/getClients', // GET: Get clients
    AdminDeactivateClient: 'admin/deactivateClient', // GET: deactivate client
    GetAdmins: '/admin/getAdmins', // GET: Get admins
    
};

// const usersEndpoint = createAPIEndpoint(ENDPOINTS.USERS);

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