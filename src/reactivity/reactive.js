import { isObject } from '../shared/utils'
import { mutableHandler } from './baseHandler'

export function reactive(target) {
  // 创建一个响应式对象 目标对象可能不一定是数组对象  还可能是set map
  return craeteReactiveObject(target, mutableHandler)
}

function craeteReactiveObject(target, baseHandler) {
  if (!isObject(target)) return target
  const observed = new Proxy(target, baseHandler)
  return observed
}
