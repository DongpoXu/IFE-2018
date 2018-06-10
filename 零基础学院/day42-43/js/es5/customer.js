function Customer(name, gender) {
    this.name = name || '';
    this.gender = gender || '';
}

Customer.prototype.order = function (dish) {
    console.log(this.name + "点了" + dish.name + "(" + dish.cost + "RMB)");
};

Customer.prototype.eat = function () {
    console.log("开始吃");
};
