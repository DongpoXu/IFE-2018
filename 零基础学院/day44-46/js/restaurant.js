/*餐厅类*/
function Restaurant(config) {
    //属性：金钱，座位数量，职员列表
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


/*职员类*/
function Staff(name, salary) {
    this.id = Math.random().toString(36).substr(2, 16);
    this.name = name || '';
    this.salary = salary || 0;
}
//职员工作
Staff.prototype.doJob = function () {
    console.log("工作完毕");
};

/*服务员*/
function Waiter(name,salary){
    Staff.call(this,name,salary);
}
Waiter.prototype = new Staff();
Waiter.prototype.doJob = function(order) {
    if (order.constructor === Array) {
        console.log('顾客点餐');
    } else {
        console.log('上菜');
    }
};

/*厨师*/
function Cook(name, salary){
    Staff.call(this,name,salary);
}
Cook.prototype = new Staff();
//Cooker的工作：烹饪出菜品
Cook.prototype.doJob = function(){
    console.log("做一道菜");
};

/*菜品*/
function Dish(name, cost, price) {
    this.name = name || '';
    this.cost = cost || 0;
    this.price = price || 0;
}

/*顾客类*/
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