import { Api } from './api.js';
import {RoutineApi} from "./routine";

export {CycleApi, Cycle};

class CycleApi {
    static url(routine_id) {
        return `${RoutineApi.url}/${routine_id}/cycles`;
    }

    static async add(routine_id, cycle) {
        return await Api.post(CycleApi.url(routine_id), true, cycle);
    }

    static async getCycles(routine_id) {
        return await Api.get(`${CycleApi.url(routine_id)}`, true, null);
    }

    static async getCycleById(routine_id, cycle_id) {
        return await Api.get(`${CycleApi.url(routine_id)}/${cycle_id}`, true, null);
    }
}

class Cycle {
    constructor(name, detail, type, order, repetitions) {
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
    }
}