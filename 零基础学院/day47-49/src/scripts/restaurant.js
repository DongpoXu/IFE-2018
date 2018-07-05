class Restaurant {
    constructor(arr) {
        this.cash = arr['cash'] || 0;
        this.seats = arr['seats'] || 0;
        this.staffList = arr['staffList'] || [];
        this.worldTime = 1000;      //基准时间
    }

    //招聘职员
    hire(staff) {
        if (this.staffList.indexOf(staff) === -1) {     //通过indexOf判断加入staff是否再staffList中
            this.staffList.push(staff);   //推入staffList中。
            console.log("招聘了" + staff.name);
        } else {
            console.log("招聘失败" + staff.name + "已经是你家员工了");
        }
    }

    //解雇职员
    fire(staff) {
        if (this.staffList.indexOf(staff) !== -1) {     //同上
            this.staffList.map((item, index) => {
                if (item.id === staff.id) {
                    this.staffList.splice(index, 1);
                    console.log("解雇了" + staff.name);
                }
            })
        } else {
            console.log("解雇失败" + staff.name + "不是你家员工");
        }
    }

    //获取基准时间
    getTime() {
        console.log("获取基准时间" + this.worldTime);
        return this.worldTime;
    }

    //设定基准时间
    setTime(num) {
        if (Number(num)) {
            console.log("设定基准时间为" + Number(num));
            this.worldTime = Number(num);
        }
        return this.worldTime;
    }

    //单例接口
    static getInstance(arr) {
        if (!this.instance) {
            this.instance = new this(arr);
        }
        return this.instance;
    }
}

let id = 0;

class Staff {
    constructor(name, salary) {
        this.id = ++id;
        this.name = name || '';
        this.salary = salary || 0;
    }

    startWork() {
        console.log(this.name + "开始工作");
    }

    finishWork() {
        console.log(this.name + "工作完毕");
    }

    //单例接口
    static getInstance(arr) {
        if (!this.instance) {
            this.instance = new this(arr);
        }
        return this.instance;
    }
}

export {Restaurant};
export {Staff};
