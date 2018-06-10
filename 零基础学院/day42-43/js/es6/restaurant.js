class Restaurant {
    //属性：金钱，座位数量，职员列表
    constructor(config) {
        this.cash = config.cash || 0;
        this.seats = config.seats || 0;
        this.staff = config.staff || [];
    }

    //招聘职员
    hire(staff) {
        this.staff.push(staff);
    }

    //解雇职员
    fire(staff) {
        this.staff.splice(this.staff.indexOf(staff), 1);
    }
}
