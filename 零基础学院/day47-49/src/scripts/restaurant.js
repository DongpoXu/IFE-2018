/*
 * @author XDP
 * @date 2018/7/6
 * @desc Restaurant Class
 */
class Restaurant {
    constructor(arr) {
        this.cash = arr['cash'] || 0;
        this.seats = arr['seats'] || 0;
        this.staffList = arr['staffList'] || [];
        this.worldTime = 1000;      //基准时间
    }

    //招聘职员
    hire(staff) {
        if (this.staffList.indexOf(staff) === -1) {     //通过indexOf判断加入staff是否再staffList中
            this.staffList.push(staff);   //推入staffList中。
            console.log("hire " + staff.name);
        } else {
            console.log("hire error" + staff.name + ", because he is your staff.");
        }
    }

    //解雇职员
    fire(staff) {
        if (this.staffList.indexOf(staff) !== -1) {     //同上
            this.staffList.map((item, index) => {
                if (item.id === staff.id) {
                    this.staffList.splice(index, 1);
                    console.log("fire " + staff.name);
                }
            })
        } else {
            console.log("fire error" + staff.name + ", he is not your staff.");
        }
    }

    //获取基准时间
    getTime() {
        console.log("get base time " + this.worldTime);
        return this.worldTime;
    }

    //设定基准时间
    setTime(num) {
        if (Number(num)) {
            console.log("set base time " + Number(num));
            this.worldTime = Number(num);
        }
        return this.worldTime;
    }

    //单例接口
    static getInstance(arr) {
        if (!this.instance) {
            this.instance = new this(arr);
        }
        return this.instance;
    }
}


/*
 * @author XDP
 * @date 2018/7/6
 * @desc Staff Class
 */
let id = 0;

class Staff {
    constructor(name, salary) {
        this.id = ++id;
        this.name = name || '';
        this.salary = salary || 0;
    }

    startWork() {
        console.log(this.name + "start work.");
    }

    finishWork() {
        console.log(this.name + "work over.");
    }

    //单例接口
    static getInstance(arr) {
        if (!this.instance) {
            this.instance = new this(arr);
        }
        return this.instance;
    }
}

/*
 * @author XDP
 * @date 2018/7/6
 * @desc
 */
class Waiter extends Staff {
    constructor(name, salary) {
        super(name, salary);
        this.customer = {};
    }

    //改变状态
    changeStatus(str, dish) {
        let pos = document.querySelector("#waiter-wrapper");
        let waiterStatus = pos.querySelector("#waiter-status");       //获取状态值
        switch (str) {
            case 'order':
                waiterStatus.innerText = 'order';
                this.moveToWhere("Customer", pos);
                break;
            case 'place an order':
                waiterStatus.innerText = 'place an order';
                this.moveToWhere("Cook", pos);
                setTimeout(function (status) {
                    status.innerText = 'free';
                }, 500, waiterStatus);        //status作为实参被传入function，上面俩status为形参
                break;
            case 'serving':
                waiterStatus.innerText = 'serving';
                this.moveToWhere("Customer", pos);
                //如果传入this.goToCook()必须为字符串格式
                setTimeout(this.moveToWhere, 500, "Cook", pos);
                setTimeout(function (status) {
                    status.innerText = 'free';
                }, 1000, waiterStatus);
                this.customer.eat(dish);        //调用顾客吃的方法
                break;
        }
    }

    //定义移动函数
    moveToWhere(where, obj) {
        switch (where) {
            case "Customer":
                obj.style.top = '225px';
                obj.style.left = '550px';
                break;
            case "Cook":
                obj.style.top = '10px';
                obj.style.left = '320px';
                break;
        }
    }
}

/*
 * @author XDP
 * @date 2018/7/6
 * @desc Cook Class
 */
class Cook extends Staff {
    constructor(name, salary) {
        super(name, salary);
        this.preList = [];
    }

    startWork() {
        console.log(this.name + 'cook dish.');
    }

    finishWork() {
        console.log(this.name + 'cook over.');
    }

    changeStatus(str) {
        let cookStatus = document.querySelector("#cook-status");
        switch (str) {
            case 'start':
                let i = 0;
                while (this.preList.length > 0) {
                    let dish = this.preList[0];     //取出菜单中的第一个元素进行烹饪
                    let arr = [];
                    for (let k = 1; k < this.preList.length; k++) {     //将其余元素放入arr[];
                        arr.push(this.preList[k]);
                    }
                    this.preList = arr;     //循环写入
                    for (let j = 0; j < dish.time; j++) {       //通过定时显示时间
                        setTimeout(function (dish) {
                            cookStatus.innerText = 'cook ' + dish.name + ' need ' + (dish.time - j) + ' seconds'
                        }, (i * 1000 + j * 1000), dish);
                    }
                    i += dish.time;     //应该是做时间补偿用
                    let temp = this.preList;
                    let that = this;      //在闭包内部调用updateCookList()，先存入that中
                    setTimeout(function (temp, that, dish) {
                        Waiter.getInstance().changeStatus('serving', dish);      //新建服务员单例进行上菜,dish服务于customer.eat()
                        that.updateCookList(temp);
                    }, i * 1000, temp, that, dish);
                }
                setTimeout(function () {
                    cookStatus.innerText = 'free'
                }, i * 1000);
                break;
        }
    }

    //更新烹饪表
    updateCookList(order) {
        order = order || this.preList;
        let list = document.querySelector("#app #cook-list");
        let result = '';
        for (let i = 0; i < order.length; i++) {
            result += '<li>' + order[i].name + '</li>';
        }
        list.innerHTML = result;
    }
}

/*
 * @author XDP
 * @date 2018/7/6
 * @desc Customer Class
 */
class Customer {
    constructor() {
        //this.seatNumber = 0;
        this.eatList = [];      //存放点的菜，以及这些菜的状态（未上，已上，吃完）
    }

    order() {       //点单，并获取随机出的一个菜品列
        let list = Menu.getInstance().getRandom();
        return list;
    }

    changeStatus(str, time) {       //顾客状态改变
        let customerStatus = document.querySelector('#customer-status');
        switch (str) {
            case 'have a seat':
                customerStatus.innerText = 'have a seat';
                break;
            case 'order':
                console.log(time);
                for (let i = 0; i < time; i += 1000) {
                    setTimeout(function () {
                        customerStatus.innerText = 'order need ' + (time - i) / 1000 + ' seconds'
                    }, i);
                }
                break;
            case 'order over':
                customerStatus.innerText = 'order over';
                break;
        }
    }

    eat(dish) {     //It takes 3 time units to eat each dish.
        let customerStatus = document.querySelector('#customer-status');
        let dishList = document.querySelectorAll('#customer-dish-list li');
        let d = {};
        for (let i = 0; i < dishList.length; i++) {
            if (dishList[i].innerText === dish.name) {
                d = dishList[i];
                break;
            }
        }
        d.innerText = dish.name + ' ready';
        customerStatus.innerText = 'start eat';
        setTimeout(function () {
            d.innerText = dish.name + ' eat up';
        }, 3000)
    }
}

/*
 * @author XDP
 * @date 2018/7/7
 * @desc Menu Class
 */
class Menu {
    constructor(list) {
        this.list = [];
        if (list != null) {
            for (let i in list) {
                this.add(list[i].name, list[i].cost, list[i].price, list[i].time);
            }
        }
    }

    add(name, cost, price, time) {          //添加菜品
        this.list.push(new Dish(name, cost, price, time));
    }

    getRandom() {       //随机获取菜品
        let times = Math.ceil(Math.random() * this.list.length);//获取次数
        let order = [];     //存放点单
        for (let i = 0; i < times; i++) {
            let index = Math.floor(Math.random() * this.list.length);
            if (order.indexOf(this.list[index]) === -1) {
                order.push(this.list[index]);
            }
        }
        return order;
    }

    //单例接口
    static getInstance(arr) {
        if (!this.instance) {
            this.instance = new this(arr);
        }
        return this.instance;
    }
}

/*
 * @author XDP
 * @date 2018/7/7
 * @desc Dish Class
 */
class Dish {
    constructor(name, cost, price, time) {      //time时间单位（1-10）
        this.name = name;
        this.cost = cost;
        this.price = price;
        this.time = time;
    }
}

export {Restaurant, Staff, Waiter, Cook, Customer, Dish, Menu};
