import { Api } from './api.js';

export {CycleExerciseApi, CycleExercise};

class CycleExerciseApi {
    static url(cycle_id) {
        return `${Api.baseUrl}/cycles/${cycle_id}/exercises`;
    }

    static async add(cycle_id, exercise_id, exercise) {
        return await Api.post(`${CycleExerciseApi.url(cycle_id)}/${exercise_id}`, true, exercise);
    }

    static async getExercises(cycle_id) {
        return await Api.get(`${CycleExerciseApi.url(cycle_id)}`, true, null);
    }

    static async getExerciseById(cycle_id, exercise_id) {
        return await Api.get(`${CycleExerciseApi.url(cycle_id)}/${exercise_id}`, true, null);
    }

}


class CycleExercise {
    constructor(order, duration , repetitions) {
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}