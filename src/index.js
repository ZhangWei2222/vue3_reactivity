// import { reactive, effect, computed, ref } from '@vue/reactivity'
import { reactive, effect, computed, ref } from './reactivity'

// console.log(reactive, effect, computed, ref)
// proxy 进行代理（拦截）
const state = reactive({ name: '有品', address: '六期', arr: [1, 2, 3] })

// 调用push方法时  回先向数组中插入值 随后在更新length

// state.arr.push(4)
// state.arr[0] = 1

effect(() => {
	console.log(state.name)
})

state.name = '小米有品'
