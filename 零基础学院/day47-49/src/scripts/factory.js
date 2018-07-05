import {Customer, Menu} from "./restaurant";

let Factory = function () {
};

Factory.create = function (string) {
    let obj = {};
    switch (string) {
        case 'Customer':
            obj = new Customer;
            break;
        case 'Menu':
            obj = Menu.getInstance();
            break;
    }
    return obj;
};

export {Factory};
