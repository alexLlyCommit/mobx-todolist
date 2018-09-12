// import { observable, isArrayLike, extendObservable } from "mobx";

// // array object map
// const arr = observable(["a", "b", "c"]);
// console.log(
//   arr,
//   Array.isArray(arr),
//   isArrayLike(arr),
//   arr[0],
//   arr[2],
//   arr.push("d"),
//   arr
// );

// const obj = observable({ a: 1, b: 2 });
// console.log(obj.a, obj.b);
// // mobx对于对象中新添加属性需要extendObservable
// extendObservable(obj, {
//   c: 123
// });
// console.log(obj.c);

// const map = observable(new Map());
// map.set("a", 1);
// console.log(map.has("a"));
// map.delete("a");
// console.log(map.has("a"));

// // 对于原始类型string,boolean,number,symbol需要使用observable.box包装成可被观察的对象
// let num = observable.box(20);
// let str = observable.box("hello");
// let bool = observable.box(true);
// console.log(num, str, bool);
// bool.set(false);
// console.log(num.get(), str.get(), bool.get());

import {
  observable,
  isArrayLike,
  computed,
  autorun,
  when,
  reaction
} from "mobx";

class Store {
  // 使用@observable修饰可以进行观察对象，mobx对observable进行了操作可以自动观察是原始类型还是引用类型，不需要调用observable.box
  @observable
  array = [];
  @observable
  obj = {};
  @observable
  map = new Map();

  @observable
  string = "hello";
  @observable
  number = 20;
  @observable
  bool = false;

  @computed
  get mixed() {
    return `${store.string}/${store.number}`;
  }
}

// computed将可观察数据进行重新组合成一个可观察数据
const store = new Store();
const foo = computed(function() {
  return `${store.string}/${store.number}`;
});
// 为了监听到foo计算值的变化
foo.observe(function(change) {
  console.log(change);
});
console.log(foo.get());
store.string = "world";
store.number = 30;

// autorun自动运行---修改任意可观察的对象类型都会触发自动运行
autorun(() => {
  console.log(`${store.string}/${store.number}`);
});

// when接收两个参数，第一个函数参数必须根据可观察对象返回布尔值，当布尔值为true的时候执行第二个函数参数
when(() => store.bool, () => console.log("it's true"));
store.bool = true;

// reaction用于对引用的可观察数据改变的时候执行副作用,在数据进行初始化之后在只要其中一个可观察对象进行数据更改触发副作用
reaction(() => [store.string, store.number], arr => console.log(arr.join("/")));
// store.string = "换行符";
store.number = 332;
