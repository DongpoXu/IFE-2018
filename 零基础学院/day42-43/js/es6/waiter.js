class Waiter extends Staff{
    constructor(name, salary) {
        super(name,salary);
    }

    doJob(order){
        if (order.constructor === Array) {
            console.log('顾客点餐');
        } else {
            console.log('上菜');
        }
    }
}