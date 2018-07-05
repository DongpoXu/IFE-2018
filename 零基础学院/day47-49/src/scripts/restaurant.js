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
            console.log("招聘了" + staff.name);
        } else {
            console.log("招聘失败" + staff.name + "已经是你家员工了");
        }
    }

    //解雇职员
    fire(staff) {
        if (this.staffList.indexOf(staff) !== -1) {     //同上
            this.staffList.map((item, index) => {
                if (item.id === staff.id) {
                    this.staffList.splice(index, 1);
                    console.log("解雇了" + staff.name);
                }
            })
        } else {
            console.log("解雇失败" + staff.name + "不是你家员工");
        }
    }

    //获取基准时间
    getTime() {
        console.log("获取基准时间" + this.worldTime);
        return this.worldTime;
    }

    //设定基准时间
    setTime(num) {
        if (Number(num)) {
            console.log("设定基准时间为" + Number(num));
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

let id = 0;

class Staff {
    constructor(name, salary) {
        this.id = ++id;
        this.name = name || '';
        this.salary = salary || 0;
    }

    startWork() {
        console.log(this.name + "开始工作");
    }

    finishWork() {
        console.log(this.name + "工作完毕");
    }

    
    //单例接口
    static getInstance(arr) {
        if (!this.instance) {
            this.instance = new this(arr);
        }
        return this.instance;
    }
}

class Waiter extends Staff {
    constructor(name, salary) {
        super(name, salary);
        this.customer = {};
    }

    startWork() {
        console.log(this.name + "开始服务");
    }

    finishWork() {
        console.log(this.name + "服务完毕");
    }

    changeStatus(str, dash) {
        let pos = document.querySelector("#waiter-wrapper");
        let status = pos.querySelector("#waiter-status");
        switch (str) {
            case '点单':
                status.innerText = '点单';
                pos.style.top = '225px';
                pos.style.left = '550px';
                break;
            case '下单':
                status.innerText = '下单';
                pos.style.top = '10px';
                pos.style.left = '320px';
                setTimeout(function (status) {
                    status.innerText = '空闲';
                }, 500, status);
                break;
            case '上菜':
                status.innerText = '上菜';
                pos.style.top = '225px';
                pos.style.left = '550px';
                setTimeout(function (pos) {
                    pos.style.top = '10px';
                    pos.style.left = '320px';
                }, 500, pos);
                setTimeout(function (status) {
                    status.innerText = '空闲';
                }, 1000, status);
                this.customer.eat(dash);
                break;
        }
    }
}

class Cook extends Staff {
    constructor(name, salary) {
        super(name, salary);
        this.preList = [];
    }

    startWork() {
        console.log(this.name + '烹饪菜品')
    }

    finishWork() {
        console.log(this.name + '烹饪完')
    }

    changeStatus(str) {
        let status = document.querySelector("#cook-status");
        switch (str) {
            case '开始':
                let i = 0;
                while (this.preList.length > 0) {
                    let dash = this.preList[0];
                    //console.log(dash);
                    //this.preList.shift();
                    let arr = [];
                    for (let k = 1; k < this.preList.length; k++) {
                        arr.push(this.preList[k]);
                    }
                    this.preList = arr;
                    for (let j = 0; j < dash.time; j++) {
                        setTimeout(function (dash) {
                            status.innerText = '烹饪' + dash.name + '还需' + (dash.time - j) + '秒'
                        }, (i * 1000 + j * 1000), dash);
                    }
                    i += dash.time;
                    let temp = this.preList;
                    let it = this;
                    setTimeout(function (temp, it, dash) {
                        Waiter.getInstance().changeStatus('上菜', dash);
                        it.updateCookList(temp)
                    }, i * 1000, temp, it, dash);
                }
                setTimeout(function () {
                    status.innerText = '空闲'
                }, i * 1000);
                break;
            case '下单':
                status.innerText = '下单';
                break;
        }
    }

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

class Customer {        //顾客类
    constructor() {
        this.seatNumber = 0;
        this.eatList = [];          //存放点的菜，以及这些菜的状态（未上，已上，吃完）
    }

    order() {           //点单，并获取随机出的一个菜品列
        let list = Menu.getInstance().getRandom();
        return list;
    }

    changeStatus(str, time) {
        let customer_status = document.querySelector('#customer-status');
        switch (str) {
            case '入座':
                customer_status.innerText = '入座';
                break;
            case '点单':
                for (let i = 0; i < time; i += 1000) {
                    setTimeout(function () {
                        customer_status.innerText = '点单还需' + (time - i) / 1000 + '秒'
                    }, i);
                }
                break;
            case '点单完毕':
                customer_status.innerText = '点单完毕';
                break;
        }
    }

    eat(dash) {             //每道菜3个时间单位
        let customer = document.querySelector('#customer-status');
        let ds = document.querySelectorAll('#customer-dash-list li');
        let d = {};
        for (let i = 0; i < ds.length; i++) {
            if (ds[i].innerText === dash.name) {
                d = ds[i];
                break;
            }
        }
        d.innerText = dash.name + '已上';
        customer.innerText = '开始用餐';
        setTimeout(function () {
            d.innerText = dash.name + '已吃完';
        }, 3000)
    }
}

class Dash {                //菜品类
    constructor(name, cost, price, time) {         //time时间单位（1-10）
        this.name = name;
        this.cost = cost;
        this.price = price;
        this.time = time;
    }
}

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
        this.list.push(new Dash(name, cost, price, time));
    }

    getRandom() {
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

export {Restaurant,Staff,Waiter,Cook,Customer,Dash,Menu};
