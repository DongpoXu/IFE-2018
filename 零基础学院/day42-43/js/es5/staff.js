function Staff(name, salary) {
    this.id = Math.random().toString(36).substr(2, 16);
    this.name = name || '';
    this.salary = salary || 0;
}

Staff.prototype.doJob = function () {
    console.log("工作完毕");
};