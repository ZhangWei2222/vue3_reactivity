import { isObject, hasOwn, hasChange } from "../shared/utils";
import { reactive } from "./reactive";
import { track, trigger } from "./effect";

const get = createGetter();
const set = createSetter();

function createGetter() {
  return function get(target, key, receiver) {
    // proxy + reflect
    const res = Reflect.get(target, key, receiver);

    console.log("用户对这个对象取值了", target, key);

    track(target, "get", key); // 依赖收集

    // 如果是对象，会用 Proxy 进行代理
    if (isObject(res)) return reactive(res);

    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    // 需要判断修改属性还是增加属性，如果原来的值和新设置的值一样  什么都不做
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const res = Reflect.set(target, key, value, receiver);
    if (!hadKey) {
      console.log("新增：", target, key);
      trigger(target, "add", key, value, oldValue);
    } else if (hasChange(value, oldValue)) {
      console.log("修改：", target, key);
      trigger(target, "set", key, value, oldValue); // 触发依赖更新
    }
    console.log('用户对这个对象设置值了', target, key, target.length)

    return res;
  };
}

// 拦截普通对象和数组
export const mutableHandler = {
  get,
  set,
};
