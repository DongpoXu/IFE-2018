//属性：金钱，座位数量，职员列表
function Restaurant(config) {
    this.cash = config.cash || 0;
    this.seats = config.seats || 0;
    this.staff = config.staff || [];
}

//招聘职员
Restaurant.prototype.hire = function (staff) {
    this.staff.push(staff);
};

//解雇职员
Restaurant.prototype.fire = function (staff) {
    this.staff.splice(this.staff.indexOf(staff), 1);
};