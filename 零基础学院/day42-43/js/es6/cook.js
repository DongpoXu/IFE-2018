class Cook extends Staff {
    constructor(name, salary) {
        super(name, salary);
    }

    doJob() {
        console.log("做一道菜");
    }
}