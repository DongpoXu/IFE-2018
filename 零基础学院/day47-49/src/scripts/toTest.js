import {Restaurant,Cook,Waiter} from "./restaurant";
import {Factory} from "./factory";

function toTest() {
    let ifeRestaurant = Restaurant.getInstance({	//建立一个ife餐馆
        cash: 1000000,
        seats: 1,
        staffList: []
    });
    let cash = document.querySelector('#app #cash');
    cash.innerText = ifeRestaurant.cash;
    let newCook = Cook.getInstance('王大厨', 10000);
    let newWaiter = Waiter.getInstance('许服务', 9000);
    let ifeMenu = Factory.create('Menu');
    ifeMenu.add('糖醋排骨', 120, 360, 3);
    ifeMenu.add('麻婆豆腐', 30, 120, 2);
    ifeMenu.add('老鸭粉丝汤', 130, 390, 2);
    ifeMenu.add('蒜枣大黄鱼', 180, 440, 4);
    ifeRestaurant.hire(newCook);
    ifeRestaurant.hire(newWaiter);
    ifeRestaurant.setTime(1000);
    let basicTime = ifeRestaurant.getTime();
    let button = document.querySelector('#app #add-customer');
    button.onclick = function () {
        if (queue.length < 18) {
            queue.push(Factory.create('Customer'));
        } else {
            alert('队伍太长啦，客人请等等再来排队吧')
        }
        updateQueue();
    };

    function startRestaurant() {
        if (document.querySelector('#customer-status').innerText !== '无') {
            return;
        }
        if (queue.length === 0) {
            return;
        }
        let customer = queue.pop();
        updateQueue();
        new Promise(function (resovle, reject) {
            customer.changeStatus('入座');
        }).then(newWaiter.changeStatus('点单'))
            .then(customer.changeStatus('点单', 3 * basicTime))
            .then(setTimeout(function () {
                customer.eatList = customer.order();
                updateCustomerList(customer.eatList);
                customer.changeStatus('点单完毕');
                newCook.preList = customer.eatList;
                newWaiter.changeStatus('下单');
                newWaiter.customer = customer;
            }, 3 * basicTime))
            .then(setTimeout(function () {
                newCook.updateCookList();
                newCook.changeStatus('开始');
            }, 3.5 * basicTime));

        let next = setInterval(function (customer) {
            nextCustomer(customer)
        }, 100, customer);
    }

    function nextCustomer(customer) {
        let eatList = document.querySelectorAll('#app #customer-dash-list li');
        let cash = document.querySelector('#app #cash');
        let customer_status = document.querySelector('#customer-status');
        if (customer_status.innerText === '就餐完毕') {
            return;
        }
        if (eatList.length === 0) {
            return;
        }
        for (let i = 0; i < eatList.length; i++) {
            if (eatList[i].innerText.indexOf('已吃完') === -1) {
                return;
            }
        }
        let money = Number(cash.innerText);
        for (let i = 0; i < customer.eatList.length; i++) {
            money += Number(customer.eatList[i].price - customer.eatList[i].cost);
        }
        cash.innerText = money;
        ifeRestaurant.cash = money;

        customer_status.innerText = '就餐完毕';
        setTimeout(function () {
            customer_status.innerText = '无';
            eatList[0].parentNode.innerHTML = '';
        }, 1000)
    }

    let start = setInterval(startRestaurant, 1000);

    //console.log(Restaurant.getInstance());
    //console.log(newWaiter);
    // new Promise(function(resolve,reject){
    // resolve()
    // }).then(function(){ setTimeout('console.log("promise test")',2000)})
}

let queue = [];             //建立一个数组，用于存放顾客队列
function updateQueue() {    //更新页面上的顾客队列
    let list = document.querySelector('#app #customer-list');
    let result = '';
    for (let i = 0; i < queue.length; i++) {
        result += '<div class = "customer"></div>';
    }
    list.innerHTML = result;
}

function updateCustomerList(order) {             //更新点单列表
    let list = document.querySelector('#app #customer-dash-list');
    let result = '';
    for (let i = 0; i < order.length; i++) {
        result += '<li>' + order[i].name + '</li>';
    }
    list.innerHTML = result;
}

export {toTest};