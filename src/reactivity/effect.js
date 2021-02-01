export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options)

  if (!options.lazy) {
    effect()
  }
  return effect
}

let uid = 0
let activeEffect
const effectStack = [] // 栈结构
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }

  effect.options = options
  effect.id = uid++
  effect.deps = []

  return effect
}
const targetMap = new WeakMap() // 用法和map一直，弱引用  不会导致内存泄漏
export function track(target, type, key) {
  if (activeEffect == undefined) return
  let depsMap = targetMap.get(target) // 根据key来取值
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

export function trigger(target, type, key, vaulue, oldValue) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const run = (effects) => {
    if (effects) {
      effects.forEach((effect) => effect())
    }
  }

  if (key !== null) run(depsMap.get(key))

  if (type === 'add') run(depsMap.get(Array.isArray(target) ? 'length' : ''))
}
