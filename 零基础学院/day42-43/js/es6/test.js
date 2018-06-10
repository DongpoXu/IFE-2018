function test() {
    let ifeRestaurant = new Restaurant({
        cash: 1000000,
        seats: 20,
        staff: []
    });

    let cookTony = new Cook('Tony', 10000);
    let waiterTom = new Waiter('Tom', 3000);
    let waiterJerry = new Waiter('Jerry', 4000);

    console.log(ifeRestaurant.staff);

    ifeRestaurant.hire(cookTony);

    console.log(ifeRestaurant.staff);

    ifeRestaurant.hire(waiterTom);

    console.log(ifeRestaurant.staff);

    ifeRestaurant.hire(waiterJerry);

    console.log(ifeRestaurant.staff);

    ifeRestaurant.fire(waiterTom);

    console.log(ifeRestaurant.staff);

    waiterTom.doJob(['11', '22']);
    waiterTom.doJob('test');

    let customerWang = new Customer('卤蛋咩', 'lady');
    customerWang.order(new Dish('鱼', 100, 200));
}

test();