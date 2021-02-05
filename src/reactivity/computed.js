import { isFunction } from "../shared/utils";
import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operation";

export function computed(getterOptions) {
  let getter;
  let setter;

  if (isFunction(getterOptions)) {
    getter = getterOptions;
    setter = () => {};
  } else {
    getter = getterOptions.get;
    setter = getterOptions.set;
  }

  let dirty = true; // 默认第一次取值执行getter方法

  let computed;

  // 计算属性也是 effect
  let runner = effect(getter, {
    lazy: true, // 默认不执行
    computed: true, // 计算属性
    scheduler: () => {
      if (!dirty) {
        dirty = true; // 计算属性依赖的值发生变化，执行 scheduler
        trigger(computed, TriggerOpTypes.SET, "value");
      }
    },
  });

  let value;

  computed = {
    get value() {
      if (dirty) {
        value = runner(); // 取值时运行effect
        dirty = false;
        console.log('dsd',computed);
        
        track(computed, TrackOpTypes.GET, "value");
      }
      return value;
    },
    set value(newVal) {
      setter(newVal);
    },
  };
  return computed;
}
