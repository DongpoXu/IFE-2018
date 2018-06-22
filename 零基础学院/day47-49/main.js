/**
 * @author Aelous
 * @Description: 主程序
 */
//创建餐厅单例
const restaurant = Restaurant.getInstance({cash: 10000, seats: 1, staffList: []});

//制作菜单  菜单结构：index:{name,cost,price,takeTime(s)}
const menu = Menu.getInstance([
    {name: '酱牛肉', cost: 35, price: 46, takeTime: 1},
    {name: '青椒炒肉丝', cost: 10, price: 20, takeTime: 2},
    {name: '老厨白菜', cost: 16, price: 8, takeTime: 3},
    {name: '红烧鱼块', cost: 40, price: 40, takeTime: 4},
    {name: '炸藕丸子', cost: 35, price: 30, takeTime: 5},
    {name: '肉末豇豆粒', cost: 25, price: 15, takeTime: 4},
    {name: '当归鸡翅', cost: 70, price: 33, takeTime: 3},
    {name: '小鱼干煎饼饭', cost: 28, price: 42, takeTime: 2},
    {name: '蛋炒饭', cost: 18, price: 10, takeTime: 1}
]);

//创建厨师一号
const cook_1 = Cook.getInstance({name: '王厨师', salary: 4000});

//创建侍者一号
const waiter_1 = Waiter.getInstance({name: '许服务', salary: 3000});

//招聘
restaurant.hire(cook_1);
restaurant.hire(waiter_1);

//dom创建厨师，暂定一位厨师
let oKitchen = document.getElementsByClassName("kitchen")[0];
cook_1.dom.createCook(oKitchen);
waiter_1.dom.createWaiter();

//顾客队列
let customerQueue = [];

//创建顾客一二三四五
const customer_1 = new Customer({name: '赵', gender: '先生'});
const customer_2 = new Customer({name: '钱', gender: '女士'});
const customer_3 = new Customer({name: '孙', gender: '先生'});
const customer_4 = new Customer({name: '李', gender: '女士'});
const customer_5 = new Customer({name: '周', gender: '先生'});
customerQueue.push(customer_1, customer_2, customer_3, customer_4, customer_5);

//添加顾客等待列表
let customerQueueObj = document.getElementById("customerQueue");
for (let customer of customerQueue) {
    customer.dom.createCustomerList(customerQueueObj);
}

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
        //入座
        restaurant.seats -= 1;
        let currentCustomer = customerList.shift();      //删除第一个元素并返回
        console.log(">>>>>>来人");
        console.log("\"" + currentCustomer.name + currentCustomer.gender + "\"" + "落座");
        //客人队列减一
        customerQueueObj.removeChild(customerQueueObj.lastElementChild);
        //安排座位
        currentCustomer.dom.sitDown();
        waiter_1.dom.goToTheCustomer(currentCustomer.dom.seatIndex);
        //点菜，耗时3s
        let order = [];
        order = await currentCustomer.order(menu);
        let cost = 0;       //成本
        order.forEach(element => cost += element.cost);     //666
        console.log(order);
        // await delay(1000);          //等待点菜
        // console.log("\"" + currentCustomer.name + currentCustomer.gender + "\""
        //     + "点了一个\"" + `${order[0].name}` + "\"");
        let waiterFlag = waiter_1.doJob(order, cook_1);
        //点菜完成，通知做菜
        if (waiterFlag) {
            let promiseList = [];
            let mealList = [];
            cook_1.dom.addCookingList(order);
            for (let x in order) {
                let meal = await cook_1.doJob(order[x]);
                mealList.push(meal);
                //通知上菜
                waiter_1.doJob({
                    meal,
                    index: currentCustomer.dom.seatIndex
                }, cook_1);
                // 补时间 具体原理不赘述了
                meal.takeTime > 3 ? addTime = 0 : addTime = Number(3 - meal.takeTime);
                // 异步操作放入数组
                await delay(0.3);
                if (x === '0') promiseList.push(currentCustomer.eat(meal));
                else promiseList.push(currentCustomer.eat(meal, addTime))
            }
            //等待所有吃饭异步操作完成
            await Promise.all(promiseList);
            waiter_1.dom.goToTheCustomer(currentCustomer.dom.seatIndex);
            await delay(0.5);
            const bill = currentCustomer.checkOut();
            restaurant.dom.updateCash(restaurant.cash = restaurant.cash + (bill - cost));
            //腾出空位
            restaurant.seats += 1;
            currentCustomer.dom.seatEmpty();
        }
    }
    await delay(1);
    if (restaurant.cash <= 0) {
        console.log("破产啦~");
    }
    if (customerList.length <= 0) {
        console.log("没客人了");
    }
    if (restaurant.seats <= 0) {
        console.log("满客了");
    }
    if (restaurant.staffList.length <= 0) {
        console.log("员工跑了");
    }
}