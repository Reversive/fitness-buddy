import { Api } from "@/api/api";

const profileStore = {
    name: 'Santos Rosati',
    email: 'srosati@itba.edu.ar',
    gender: 'male',
    age: 20,
    height: 173,
    weight: 67,
    update: async () => {
        const result = await Api.get(Api.baseUrl+'/users/current', true, null);
        console.log(result);
        if (result.code === 200) {
            const {firstName, email, gender, age, height, weight} = result.body;
            profileStore.name = firstName;
            profileStore.email = email;
            profileStore.gender = gender;
            profileStore.age = age;
            profileStore.height = height;
            profileStore.weight = weight;
        }
    },
    modify: async () => {
        const data = {
            firstName: profileStore.name,
            age: profileStore.age,
            gender: profileStore.gender,
            height: profileStore.height,
            weight: profileStore.weight
        };
        await Api.put(Api.baseUrl+'/users/current', true, data, null);
    }
}

export default profileStore;