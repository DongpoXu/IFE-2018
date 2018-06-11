/**
 * @author Aelous
 * @Description: 餐厅类
 */
class Restaurant {
    constructor({cash = 0, seats = 0, staffList = []} = {}) {
        this.cash = cash;
        this.seats = seats;
        this.staffList = staffList;
    }

    //单例接口
    static getInstance(param) {
        if (!this.instance) {
            this.instance = new Restaurant(param);
        }
        return this.instance;
    }

    //招聘职员
    hire(newStaff) {
        this.staffList.push(newStaff);
    }

    //解雇职员
    fire(staff) {
        this.staffList = this.staffList.filter((item) => {
            return item.id !== staff.id;
        })
    }
}

/**
 * @author Aelous
 * @Description: 职员类
 */
let id = 1;

class Staff {
    constructor({name = '', salary = 0} = {}) {
        this.id = Math.random().toString(36).substr(2, 16);
        this.name = name;
        this.salary = salary;
    }

    //单例接口
    static getInstance(param) {
        if (!this.instance) {
            this.instance = new Staff(param);
        }
        return this.instance;
    }

    //完成工作
    doJob() {
        console.log("完成工作");
    }
}

/**
 * @author Aelous
 * @Description: 服务员：继承自职员类
 */
class Waiter extends Staff {
    constructor({name = '', salary = 0} = {}) {
        super(name, salary);     //使用super代替call(this)
    }

    //单例接口
    static getInstance(param) {
        if (!this.instance) {
            this.instance = new Waiter(param);
        }
        return this.instance;
    }

    //服务员完成工作
    doJob(order) {
        //如果参数为数组，则记录客人点菜，如果不是则为上菜行为
        if (order.length !== undefined && typeof order !== "string") {
            console.log("记录点菜");
            return true;
        } else {
            console.log("进行上菜");
            return true;
        }
    }
}

/**
 * @author Aelous
 * @Description: 厨师类：继承自职员类
 */
class Cook extends Staff {
    constructor({name = '', salary = 0} = {}) {
        super(name, salary);
    }

    //单例接口
    static getInstance(param) {
        if (!this.instance) {
            this.instance = new Cook(param);
        }
        return this.instance;
    }

    //厨师完成工作
    doJob() {
        console.log("完成烹饪");
        return true;
    }
}

/**
 * @author Aelous
 * @Description: 菜品类
 * @param {array} list
 */
class Menu {
    constructor(list) {
        //一次输入多个菜品
        list.forEach((item, index) => {
            this[index] = {
                name: item.name,
                cost: item.cost,
                price: item.price
            };
        })
    }

    //单例接口
    static getInstance(param) {
        if (!this.instance) {
            this.instance = new Menu(param);
        }
        return this.instance;
    }
}

/**
 * @author Aelous
 * @Description: 顾客类
 */
class Customer {
    constructor({name = '', gender = ''} = {}) {
        this.name = name;
        this.gender = gender;
    }

    //单例接口
    static getInstance(param) {
        if (!this.instance) {
            this.instance = new Customer(param);
        }
        return this.instance;
    }

    // 点菜
    order(menu) {
        // 随便点一道菜
        const index = Math.round((Object.keys(menu).length - 1) * Math.random());
        return menu[index];
    }

    // 吃
    eat() {
        console.log('>>>>吃完了<<<<');
        return true;
    }
}