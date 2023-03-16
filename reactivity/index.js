// 响应式

// 依赖
let currentEffect;
class Dep {
    constructor(val) {
        this.effects = new Set();
        this._val = val;
    }
    get value() {
        this.depend();
        return this._val;
    }
    set value(newValue) {
        this._val = newValue;
        this.notice();
    }
    // 收集依赖
    depend() {
        if (currentEffect) {
            this.effects.add(currentEffect);
        }
    }
    // 触发依赖
    notice() {
        this.effects.forEach(effect => {
            effect();
        });
    }
}

export function effectWatch(effect) {
    currentEffect = effect;
    effect();
    // dep.depend();
    currentEffect = null;
}

// const dep = new Dep(10);
// let b;
// effectWatch(() => {
//     b = dep.value + 10;
//     console.log(b)
// })

// // 值发生变化
// dep.value = 20;
// dep.notice();


// reactive
// proxy
const targetMap = new Map();

function getDep(target, key) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    
    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Dep();
        depsMap.set(key, dep);
    }
    return dep;
}

export function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            console.log(target);
            console.log(key);
            const dep = getDep(target, key);

            // // 依赖收集
            dep.depend();

            // return target[key];
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            console.log(key+'改變了');
            // 触发依赖
            const dep = getDep(target, key);
            const res = Reflect.set(target, key, value);
            dep.notice();
            return res;
        }
    })
}

// const user = reactive({
//     age: 11
// })
// // console.log(user.age);
// let double;
// effectWatch(() => {
//     double = user.age;
//     console.log(double);
// })

// user.age = 20;

