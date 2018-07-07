import {Customer, Menu} from "./restaurant";

/*
 * @author 许东坡
 * @date 2018/7/7
 * @desc 简单工厂模式
 * 简单理解，利用工厂模式封装了方法，不用创建为对象，因为没有对象
 * 疑问：这个写法是什么意思呢，有没有其他的写法。
 */
let Factory = function () {
};

Factory.create = function (string) {        //输入想要创建的对象
    let obj = {};
    switch (string) {
        case 'Customer':
            obj = new Customer;
            break;
        case 'Menu':
            obj = Menu.getInstance();       //菜单创建单例
            break;
    }
    return obj;
};

export {Factory};