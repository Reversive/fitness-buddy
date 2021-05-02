const RoutineStore = {
    id: null,
    categories: [],
    name: null,
    difficulty: null,
    cycles: [],

    clearRoutine() {
        this.id = null;
        this.categories = [];
        this.name = null;
        this.difficulty = null;
        this.cycles = [];
    }
}

export default RoutineStore;