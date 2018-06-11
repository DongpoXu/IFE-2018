/**
 * @author Aelous
 * @Description: 主程序
 */

//开业餐厅
const restaurant = Restaurant.getInstance({
    cash: 100000,
    seats: 1,
    staffList: []
});

//制作菜单  菜单结构：index:{name,cost,price}
const menu = Menu.getInstance([
    {name: '菜品1', cost: 1, price: 20,},
    {name: '菜品2', cost: 1, price: 20,},
    {name: '菜品3', cost: 1, price: 20,},
    {name: '菜品4', cost: 1, price: 20,},
    {name: '菜品5', cost: 1, price: 20,},
    {name: '菜品6', cost: 1, price: 20,},
    {name: '菜品7', cost: 1, price: 20,},
    {name: '菜品8', cost: 1, price: 20,},
    {name: '菜品9', cost: 1, price: 20,}
]);

//创建厨师一号
const cook_1 = Cook.getInstance({
    name: '厨师一号',
    salary: 4000
});

//创建侍者一号
const waiter_1 = Waiter.getInstance({
    name: '侍者一号',
    salary: 3000
});

//招聘
restaurant.hire(cook_1);
restaurant.hire(waiter_1);

//顾客队列
let customerQueue = [];
//创建顾客一二三四五
const customer_1 = Customer.getInstance({
    name: '顾客一号',
    gender: '男'
});
const customer_2 = Customer.getInstance({
    name: '顾客二号',
    gender: '女'
});
const customer_3 = Customer.getInstance({
    name: '顾客三号',
    gender: '男'
});
const customer_4 = Customer.getInstance({
    name: '顾客四号',
    gender: '女'
});
const customer_5 = Customer.getInstance({
    name: '顾客五号',
    gender: '男'
});
customerQueue.push(customer_1, customer_2, customer_3, customer_4, customer_5);

//运转餐厅
document.getElementById("open").addEventListener('click', () => opening(customerQueue));

/**
 * @author Aelous
 * @Description: 餐厅运转
 * @param {array} queue
 */
async function opening(queue) {
    //保存队列
    let customerList = [...queue];
    while (restaurant.seats > 0
    && restaurant.cash > 0
    && restaurant.staffList.length > 0
    && customerList.length > 0) {
        console.log(restaurant.seats);
        console.log(restaurant.cash);
        console.log(restaurant.staffList);
        console.log(customerList);
        //入座
        console.log("来了一位顾客");
        restaurant.seats -= 1;
        let currentCustomer = customerList.shift();      //删除第一个元素并返回
        //点菜
        let order = [];
        await delay(1000);
        order.push(currentCustomer.order(menu));
        let waiterFlag = waiter_1.doJob(order);
        await delay(1000);
        console.log("点一个" + `${order[0].name}`);
        //点菜完成，通知做菜
        let cookFlag = false;
        if (waiterFlag) {
            console.log("烹饪中...");
            await delay(4000);
            cookFlag = cook_1.doJob(order);
        }
        //做菜完成，通知上菜
        if (cookFlag) {
            console.log("服务员上菜");
            await delay(1000);
            waiterFlag = waiter_1.doJob(order);
            await delay(1000);
            console.log("这是您点的" + `${order[0].name}`);
            console.log('上菜完成');
        }
        //顾客吃菜
        let customerFlag = false;
        if (waiterFlag) {
            await delay(1000);
            console.log("这个" + `${order[0].name}` + "真香");
            await delay(1000);
            customerFlag = currentCustomer.eat();
            console.log("吃饱了");
        }
        //顾客吃完离开
        if (customerFlag) {
            restaurant.seats += 1;
        }
    }
    await delay(1000);
    console.log('没客人了');

    await delay(1000);
    console.log('打烊！');
}

/**
 * @author Aelous
 * @Description: 延时函数
 * @param {number} time
 */
function delay(time) {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, time);
    })
}