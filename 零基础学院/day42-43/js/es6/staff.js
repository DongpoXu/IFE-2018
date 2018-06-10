class Staff {
    constructor(name, salary) {
        this.id = Math.random().toString(36).substr(2, 16);
        this.name = name || '';
        this.salary = salary || 0;
    }

    doJob() {
        console.log("工作完毕");
    }
}