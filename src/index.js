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

import { observable, isArrayLike } from "mobx";

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
}
