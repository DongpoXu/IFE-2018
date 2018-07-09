import {Customer, Menu} from "./restaurant";

/*
 * @author XDP
 * @date 2018/7/7
 * @desc simple factory mode
 * 简单理解，利用工厂模式封装了方法，不用创建为对象，因为没有对象
 * 疑问：这个写法是什么意思呢，有没有其他的写法。
 */
let Factory = function () {
};

Factory.create = function (string) {        //enter the object you want to create
    let obj = {};
    switch (string) {
        case 'Customer':
            obj = new Customer;
            break;
        case 'Menu':
            obj = Menu.getInstance();       //Menu create singleton
            break;
    }
    return obj;
};

export {Factory};