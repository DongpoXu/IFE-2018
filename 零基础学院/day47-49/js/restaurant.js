/**
 * @author Aelous
 * @Description: 餐厅类
 */
class Restaurant {
    constructor({cash = 0, seats = 0, staffList = []} = {}) {
        this.cash = cash;
        this.seats = seats;
        this.staffList = staffList;
        this.dom = new restaurantDomOperate();       //new一个餐厅dom操作
        this.dom.updateCash(this.cash);      //更新餐厅拥有的现金
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
class Staff {
    constructor({name = '', salary = ''} = {}) {
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
    constructor({name = '', salary = ''}) {
        super({name, salary});
        this.dom = new waiterDomOperate();
    }

    //单例接口
    static getInstance(param) {
        if (!this.instance) {
            this.instance = new Waiter(param);
        }
        return this.instance;
    }

    //服务员完成工作
    async doJob(order, cook) {
        //如果参数为数组，则记录客人点菜，如果不是则为上菜行为
        if (order.length !== undefined && typeof order !== "string") {
            //修改服务员位置
            let position = this.dom.goToTheCook('order', 'cook');
            this.dom.waiterDom.setAttribute('style', `left:${position.left}px;top:${position.top}px`);
            await delay(500);
            return true;
        } else {
            let position = this.dom.goToTheCook('pass', cook);
            this.dom.waiterDom.setAttribute('style', `left:${position.left}px;top:${position.top}px`);
            cook.dom.removeState();
            await delay(500);
            this.dom.goToTheCustomer(order.index);
            await delay(500);
            console.log(">>>>>进行上菜<<<<<")
            this.dom.goToDefault();
            return order.meal;
        }
    }
}

/**
 * @author Aelous
 * @Description: 厨师类：继承自职员类
 */
class Cook extends Staff {
    constructor({name = '', salary = ''}) {
        super({name, salary});
        this.dom = new cookDomOperate();
    }

    //单例接口
    static getInstance(param) {
        if (!this.instance) {
            this.instance = new Cook(param);
        }
        return this.instance;
    }

    //厨师完成工作
    async doJob() {
        //完成一次烹饪
        console.log("烹饪中...");
        this.dom.cookDom.removeAttribute('complete');
        let currentCooking = this.dom.removeItem(menu);
        this.dom.addState(currentCooking);
        for (let i = 0; i < (Number(menu.takeTime)); i++) {
            await delay(1000);
            this.dom.updateTime();
        }
        this.dom.cookDom.setAttribute('complete', '');
        return new Promise(resolve => resolve(menu));
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
                name: item.name,        //菜名
                cost: item.cost,        //花费
                price: item.price,      //价格
                takeTime: item.takeTime     //做菜时间
            };
        });
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
    constructor({name = '', gender = '', baseTime = 3} = {}) {
        this.name = name;
        this.gender = gender;
        this.baseTime = baseTime;
        this.order;
        this.dom = new customerDomOperate();
    }

    //顾客不用单例
    // 点菜
    async order(menu) {
        // 随便点1~5道菜
        let num = Math.ceil(6 * Math.random());
        let orderList = [];
        for (let i = 0; i < num; i++) {
            const index = Math.round((Object.keys(menu).length - 1) * Math.random());
            orderList.push(menu[index]);
        }
        //根据baseTime延时
        for (let i = this.baseTime; i >= 0; i--) {
            this.dom.updateOrderState(i);
            await delay(1000);
        }
        // 将点的菜添加到列表
        this.dom.addOrderList(orderList);
        return new Promise((resolve)=>resolve(orderList))
    }

    // 吃
    async eat(meal, addTime = 0) {
        let time = addTime + this.baseTime;
        for (let i = time; i >= 0; i--) {
            this.dom.updateOrderList(meal, 'eat', i);
            await delay(1000);
        }
        this.dom.updateOrderList(meal, 'over');
        console.log('吃完', meal.name);
        return new Promise(resolve=>resolve(true))
    }

    //结账
    checkOut() {
        let money = 0;
        for (dish of this.order) {
            money += dish.price;
        }
        console.log("结帐", money);
        return money;
    }
}

/**
 * @author Aelous
 * @Description: 延迟函数
 * @param {number} time
 */
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve()
        }, time);
    });
}