import {Api} from "./api";
export {ExerciseApi, Exercise, Image, Video};

class ExerciseApi {
    static get url() {
        return `${Api.baseUrl}/exercises`;
    }

    static async get() {
        return await Api.get(ExerciseApi.url, true, null);
    }

    static async add(exercise) {
        return await Api.post(ExerciseApi.url, true, exercise);
    }

    static async addImage(exercise_id, image) {
        return await Api.post(`${ExerciseApi.url}/${exercise_id}/images`, true, image);
    }

    static async getImage(exercise_id) {
        return await Api.get(`${ExerciseApi.url}/${exercise_id}/images`, true, null);
    }

    static async updateImage(exercise_id, image) {
        return await Api.put(`${ExerciseApi.url}/${exercise_id}/images/1`, true, image, null);
    }

    static async addVideo(exercise_id, video) {
        return await Api.post(`${ExerciseApi.url}/${exercise_id}/videos`, true, video);
    }

    static async updateVideo(exercise_id, video) {
        return await Api.put(`${ExerciseApi.url}/${exercise_id}/videos/1`, true, video, null);
    }

    static async getVideos(exercise_id) {
        return await Api.get(`${ExerciseApi.url}/${exercise_id}/videos`, true, null);
    }

    static async deleteExercise(exercise_id) {
        return await Api.delete(`${ExerciseApi.url}/${exercise_id}`, true, null);
    }

    static async update(exercise_id, exercise) {
        return await Api.put(`${ExerciseApi.url}/${exercise_id}`, true, exercise, null);
    }

}

class Exercise {
    constructor(name, detail, type) {
        this.name = name;
        this.detail = detail;
        this.type = type;
    }
}

class Image {
    constructor(imageUrl) {
        this.number = 1;
        this.url = imageUrl;
    }
}

class Video {
    constructor(videoUrl) {
        this.number = 1;
        this.url = videoUrl;
    }
}