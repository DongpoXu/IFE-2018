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
        this.worldTime = 1000;      //Base time
    }

    //hire staff
    hire(staff) {
        if (this.staffList.indexOf(staff) === -1) {     //通过indexOf判断加入staff是否再staffList中
            this.staffList.push(staff);     //push staff into the staff list
            console.log("hire " + staff.name);
        } else {
            console.log("hire error" + staff.name + ", because he is your staff.");
        }
    }

    //fire staff
    fire(staff) {
        if (this.staffList.indexOf(staff) !== -1) {
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

    //get base time
    getTime() {
        console.log("get base time " + this.worldTime);
        return this.worldTime;
    }

    //set base time
    setTime(num) {
        if (Number(num)) {
            console.log("set base time " + Number(num));
            this.worldTime = Number(num);
        }
        return this.worldTime;
    }

    //Singleton interface
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

    //Singleton interface
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
 * @desc Waiter Class
 */
class Waiter extends Staff {
    constructor(name, salary) {
        super(name, salary);
        this.customer = {};
    }

    //change status
    changeStatus(str, dish) {
        let pos = document.querySelector("#waiter-wrapper");
        let waiterStatus = pos.querySelector("#waiter-status");       //get status value
        switch (str) {
            case 'order':
                waiterStatus.innerText = 'order';
                this.moveToWhere("Customer", pos);
                break;
            case 'place an order':
                waiterStatus.innerText = 'place an order';
                this.moveToWhere("Cook", pos);
                //waiterStatus: actual parameter; status: formal parameters
                setTimeout(function (status) {
                    status.innerText = 'free';
                }, 500, waiterStatus);
                break;
            case 'serving':
                waiterStatus.innerText = 'serving';
                this.moveToWhere("Customer", pos);
                //this.goToCook() have to be a string!!!
                setTimeout(this.moveToWhere, 500, "Cook", pos);
                setTimeout(function (status) {
                    status.innerText = 'free';
                }, 1000, waiterStatus);
                this.customer.eat(dish);        //call the customer.eat() method
                break;
        }
    }

    //define move function
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
                    let dish = this.preList[0];     //take the first element out of the menu and cook
                    let arr = [];
                    for (let k = 1; k < this.preList.length; k++) {     //put the rest in the arr[]
                        arr.push(this.preList[k]);
                    }
                    this.preList = arr;     //write back
                    for (let j = 0; j < dish.time; j++) {       //time is display by timing
                        setTimeout(function (dish) {
                            cookStatus.innerText = 'cook ' + dish.name + ' need ' + (dish.time - j) + ' seconds'
                        }, (i * 1000 + j * 1000), dish);
                    }
                    i += dish.time;     //time compensation
                    let temp = this.preList;
                    let that = this;      //UpdateCookList () is called inside the closure and is stored in that first
                    setTimeout(function (temp, that, dish) {        //dish is server of customer.eat() method
                        Waiter.getInstance().changeStatus('serving', dish);      //make a new waiter
                        that.updateCookList(temp);
                    }, i * 1000, temp, that, dish);
                }
                setTimeout(function () {
                    cookStatus.innerText = 'free'
                }, i * 1000);
                break;
        }
    }

    //update cook list
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
        this.eatList = [];      //store the dish and the dish status
    }

    order() {       //get a random menu
        let list = Menu.getInstance().getRandom();
        return list;
    }

    changeStatus(str, time) {       //change customer status
        let customerStatus = document.querySelector('#customer-status');
        switch (str) {
            case 'have a seat':
                customerStatus.innerText = 'have a seat';
                break;
            case 'order':
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

    add(name, cost, price, time) {      //add dish
        this.list.push(new Dish(name, cost, price, time));
    }

    getRandom() {       //random meal list
        let times = Math.ceil(Math.random() * this.list.length);        //get times
        let order = [];     //store order list
        for (let i = 0; i < times; i++) {
            let index = Math.floor(Math.random() * this.list.length);
            if (order.indexOf(this.list[index]) === -1) {
                order.push(this.list[index]);
            }
        }
        return order;
    }

    //Singleton interface
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
    constructor(name, cost, price, time) {      //time unit (1-10）
        this.name = name;
        this.cost = cost;
        this.price = price;
        this.time = time;
    }
}

export {Restaurant, Staff, Waiter, Cook, Customer, Dish, Menu};
