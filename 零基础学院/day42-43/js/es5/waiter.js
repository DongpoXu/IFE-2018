function Waiter(name,salary){
    Staff.call(this,name,salary);
}

Waiter.prototype = new Staff();

Waiter.prototype.doJob = function(order) {
    if (order.constructor === Array) {
        console.log('顾客点餐');
    } else {
        console.log('上菜');
    }
};