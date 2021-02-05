// import { reactive, effect, computed, ref } from '@vue/reactivity'
import { reactive, effect, computed, ref } from "./reactivity";

// console.log(reactive, effect, computed, ref)
// proxy 进行代理（拦截）
const state = reactive({
  name: "有品",
  address: "六期",
  arr: [1, 2, 3],
  one: 1,
  two: 1,
  sum: 0,
  sums:0
});

// 调用push方法时，会先向数组中插入值 随后在更新length

// 取值操作
// state.name

// 修改操作
// state.name = '小米有品'

// state.arr.push(4);
// state.arr[0] = 1

// 打印出来是个 Proxy
// console.log('arr', state.arr);

effect(() => {
	
	state.sum = state.one + state.two
	// state.arr.push(4)
	// // console.log(state.name,state.address,state.arr)
})

effect(() => {
	
	state.sums = state.one
	// state.arr.push(4)
	// // console.log(state.name,state.address,state.arr)
})
state.sum
state.one = 2;
// state.name = '小米有品'


// state.arr.push(5)
