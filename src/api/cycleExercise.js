import { Api } from './api.js';
import {CycleApi} from "./cycle";

export {CycleExercise, Exercise};

class CycleExercise {
    static url(routine_id, cycle_id) {
        return `${CycleApi.url(routine_id)}/${cycle_id}/exercises`;
    }

    static async add(routine_id, cycle_id, exercise_id, exercise) {
        return await Api.post(`${CycleExercise.url(routine_id, cycle_id)}/${exercise_id}`, true, exercise);
    }

    static async getExercises(routine_id, cycle_id) {
        return await Api.get(`${CycleExercise.url(routine_id, cycle_id)}`, true, null);
    }

    static async getExerciseById(routine_id, cycle_id, exercise_id) {
        return await Api.get(`${CycleExercise.url(routine_id, cycle_id)}/${exercise_id}`, true, null);
    }
}


class Exercise {
    constructor(order, duration , repetitions) {
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}