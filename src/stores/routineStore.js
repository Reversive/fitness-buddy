const RoutineStore = {
    id: null,
    category: null,
    name: null,
    difficulty: null,
    cycles: [],

    clearRoutine() {
        this.id = null;
        this.category = null;
        this.name = null;
        this.difficulty = null;
        this.cycles = [];
    }
}

export default RoutineStore;