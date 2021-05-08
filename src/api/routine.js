import { Api } from './api.js';

export {RoutineApi, Routine};

class RoutineApi {
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    static async add(routine) {
        return await Api.post(RoutineApi.url, true, routine);
    }

    static async get(routine_id) {
        return await Api.get(`${RoutineApi.url}/${routine_id}`, true, null);
    }
}


class Routine {
    constructor(name, detail, isPublic, difficulty, category) {
        this.name = name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.difficulty = difficulty;
        this.category = { id: category };
    }
}