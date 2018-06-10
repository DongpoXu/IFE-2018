class Customer {
    constructor(name, gender) {
        this.name = name || '';
        this.gender = gender || '';
    }

    order(dish) {
        console.log(this.name + "点了" + dish.name + "(" + dish.cost + "RMB)");
    }

    eat() {
        console.log("开始吃");
    }
}