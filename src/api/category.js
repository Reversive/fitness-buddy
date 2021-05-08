import {Api} from "./api";
export {CategoryApi, Category};
class CategoryApi {
    static get url() {
        return `${Api.baseUrl}/categories`;
    }

    static async get() {
        return await Api.get(CategoryApi.url, true, null);
    }

    static async add(category) {
        return await Api.post(CategoryApi.url, true, category);
    }
}

class Category {
    constructor(name, detail) {
        this.name = name;
        this.detail = detail;
    }
}