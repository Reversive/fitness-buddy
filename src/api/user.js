import { Api } from './api.js';

export { UserApi, Credentials, SignUpCredentials};

class UserApi {
    static get url() {
        return `${Api.baseUrl}/users`;
    }

    static async login(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        Api.token = result.token;
    }

    static async logout(controller) {
        await Api.post(`${UserApi.url}/logout`, true, controller);
        Api.token = undefined;
    }
    static async register(credentials){
        await Api.post(`${UserApi.url}`,false,credentials);
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
class SignUpCredentials{
    constructor(username,email,password) {
        this.username=username;
        this.email=email;
        this.password=password;
    }

}