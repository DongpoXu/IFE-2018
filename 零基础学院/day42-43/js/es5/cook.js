function Cook(name, salary){
    Staff.call(this,name,salary);
}

Cook.prototype = new Staff();

//Cooker的工作：烹饪出菜品
Cook.prototype.doJob = function(){
    console.log("做一道菜");
};