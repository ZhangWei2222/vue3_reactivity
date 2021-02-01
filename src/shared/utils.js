export const isObject = (val) => typeof val === 'object' && val !== null

export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export const hasChange = (newVal, oldVal) => newVal !== oldVal