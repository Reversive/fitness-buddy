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

    static async addVideo(exercise_id, video) {
        return await Api.post(`${ExerciseApi.url}/${exercise_id}/videos`, true, video);
    }

    static async getVideos(exercise_id) {
        return await Api.get(`${ExerciseApi.url}/${exercise_id}/videos`, true, null);
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