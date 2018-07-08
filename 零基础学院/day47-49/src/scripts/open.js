//I can't use Chinese, because this IDE has a bug, I can't solve it. So I change my language.
import {Restaurant, Cook, Waiter} from "./restaurant";
import {Factory} from "./factory";

/*
 * @author XDP
 * @date 2018/7/8
 * @desc the restaurant open
 */
function restaurantStart() {
    let ifeRestaurant = Restaurant.getInstance({        //create Restaurant Instance
        cash: 1000000,
        seats: 1,
        staffList: []
    });
    let cash = document.querySelector('#app #cash');        //let the cash init
    cash.innerText = ifeRestaurant.cash;

    //create staff, then hire
    let newCook = Cook.getInstance('Cook_Wang', 10000);
    let newWaiter = Waiter.getInstance('Waiter_Xu', 5000);
    ifeRestaurant.hire(newCook);
    ifeRestaurant.hire(newWaiter);

    //create menu, add dish
    let ifeMenu = Factory.create('Menu');
    ifeMenu.add('Pasta', 130, 390, 2);
    ifeMenu.add('Cabbage mustard', 120, 360, 3);
    ifeMenu.add('Bean sprouts', 30, 120, 2);
    ifeMenu.add('Cocoa powder', 180, 440, 4);

    ifeRestaurant.setTime(1000);
    let basicTime = ifeRestaurant.getTime();
    let oBtnAddCustomer = document.querySelector('#app #add-customer');
    oBtnAddCustomer.onclick = function () {
        if (queue.length < 18) {
            queue.push(Factory.create('Customer'));     //press the button, push the customer
        } else {
            alert('The queue is too long, you can\'t wait in here.');
        }
        updateQueue();      //every time add we have to update the queue
    };

    let start = setInterval(startRestaurant, 1000);
    let oBtnPause = document.getElementById("pause");       //pause and continue
    oBtnPause.onclick = function () {
        if (this.value === "PAUSE") {
            console.log(this.value);
            this.value = "CONTINUE";
            clearInterval(start);
        } else {
            console.log(this.value);
            this.value = "PAUSE";
            setInterval(startRestaurant, 1000)
        }
    };

    function startRestaurant() {
        let customerStatus = document.querySelector('#customer-status').innerText;
        if (customerStatus !== 'None' || queue.length === 0) {
            return;
        }

        //shift() method is used to remove and return the first element of the array
        let customer = queue.shift();
        updateQueue();

        new Promise(
            function (resolve,rejects) {
                customer.changeStatus('have a seat');
                console.log("The customer has sat down");
                resolve();      //you have to write this. is mean do the promise.
            })
            .then(() => {
                newWaiter.changeStatus('order');
            })
            .then(() => {
                customer.changeStatus('order', 3000);
            })
            .then(() => {
                setTimeout(function () {
                    customer.eatList = customer.order();
                    updateCustomerList(customer.eatList);
                    customer.changeStatus('order over');
                    newCook.preList = customer.eatList;
                    newWaiter.changeStatus('place an order');
                    newWaiter.customer = customer;
                }, 3 * basicTime);
            })
            .then(() => {
                setTimeout(function () {
                    newCook.updateCookList();
                    newCook.changeStatus('start');
                }, 3.5 * basicTime);
            });

        //listen current customer has left, if so, the next customer enter.
        let next = setInterval(function (customer) {
            nextCustomer(customer);
        }, 100, customer);
    }

    function nextCustomer(customer) {
        let eatList = document.querySelectorAll('#app #customer-dish-list li');
        let cash = document.querySelector('#app #cash');
        let customer_status = document.querySelector('#customer-status');
        if (customer_status.innerText === 'After dinner') {
            return;
        }
        if (eatList.length === 0) {
            return;
        }
        for (let i = 0; i < eatList.length; i++) {
            if (eatList[i].innerText.indexOf('eat up') === -1) {
                return;
            }
        }
        let money = Number(cash.innerText);
        for (let i = 0; i < customer.eatList.length; i++) {
            money += Number(customer.eatList[i].price - customer.eatList[i].cost);
        }
        cash.innerText = money;
        ifeRestaurant.cash = money;

        customer_status.innerText = 'After dinner';
        setTimeout(function () {
            customer_status.innerText = 'None';
            eatList[0].parentNode.innerHTML = '';
        }, 1000)
    }

    let queue = [];     //Create an array to hold the customer queue.

    //Update the customer queue on the page.
    function updateQueue() {
        let list = document.querySelector('#app #customer-list');
        let result = '';
        for (let i = 0; i < queue.length; i++) {
            result += '<div class = "customer"></div>';
        }
        list.innerHTML = result;
    }

    function updateCustomerList(order) {             //Update the order list
        let list = document.querySelector('#app #customer-dish-list');
        let result = '';
        for (let i = 0; i < order.length; i++) {
            result += '<li>' + order[i].name + '</li>';
        }
        list.innerHTML = result;
    }
}

export {restaurantStart};