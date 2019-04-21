# Set与Map

- [Set与Map](#set%E4%B8%8Emap)
  - [ES5 中的 Set 与 Map](#es5-%E4%B8%AD%E7%9A%84-set-%E4%B8%8E-map)
  - [变通方法的问题](#%E5%8F%98%E9%80%9A%E6%96%B9%E6%B3%95%E7%9A%84%E9%97%AE%E9%A2%98)
  - [ES6中的Set⭐](#es6%E4%B8%AD%E7%9A%84set%E2%AD%90)
    - [创建 Set 并添加项目](#%E5%88%9B%E5%BB%BA-set-%E5%B9%B6%E6%B7%BB%E5%8A%A0%E9%A1%B9%E7%9B%AE)
    - [移除Set的值](#%E7%A7%BB%E9%99%A4set%E7%9A%84%E5%80%BC)
    - [Set 上的 forEach() 方法](#set-%E4%B8%8A%E7%9A%84-foreach-%E6%96%B9%E6%B3%95)
    - [将 Set 转换为数组以及数组去重⭐](#%E5%B0%86-set-%E8%BD%AC%E6%8D%A2%E4%B8%BA%E6%95%B0%E7%BB%84%E4%BB%A5%E5%8F%8A%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D%E2%AD%90)
    - [Weak Set](#weak-set)
  - [ES6中的Map⭐](#es6%E4%B8%AD%E7%9A%84map%E2%AD%90)
    - [Map 的方法](#map-%E7%9A%84%E6%96%B9%E6%B3%95)
    - [Map 的初始化(用数组传值)](#map-%E7%9A%84%E5%88%9D%E5%A7%8B%E5%8C%96%E7%94%A8%E6%95%B0%E7%BB%84%E4%BC%A0%E5%80%BC)
    - [Map 上的 forEach 方法](#map-%E4%B8%8A%E7%9A%84-foreach-%E6%96%B9%E6%B3%95)
    - [Weak Map](#weak-map)

Set 与 Map 是JS中的两种集合。

Set不包含重复值。一般用来检查某个键值是否存在

Map是存储许多键值对的有序列表，key和value支持所有数据类型。Map 常被用作缓存，存储数据以便此后快速检索。

## ES5 中的 Set 与 Map

ES5 中的 Set 与 Map都是用对象模拟的，区别在于模拟Set时，赋值一般是布尔类型，直接判断是否存在，模拟Map时，赋值是字符串等类型的值，因为需要取出值

## 变通方法的问题

用对象模拟Set和Map存在一些隐患，将对象转换为默认的字符串表现形式，使得对象很难被当作 Map 的键来使用（此问题同样存在于将对象作为 Set 来使用的尝试上）,看下面例子

```javaScript
// 由于对象的属性名会默认转为字符串类型， 因此数值5和"5"会被认成同一个，而使用对象的时候，都会被转为"[object Object]"。
let map = Object.create(null);
let obj1 = {1: "sd"};
let obj2 = {};
map[5] = "555";
map[obj1] = "obj111";
console.log(map["5"], map[5]) //555 555
console.log(map[obj1], map[obj2]) // obj111 obj111
```

## ES6中的Set⭐

Set类型，**这是一种无重复值的有序列表。**

### 创建 Set 并添加项目

Set 不会使用强制类型转换来判断值是否重复，因此你可以使用数值5和"5"以及不同的对象表示不同的项,Set内部是使用[Object.is()](./第四章：扩展的对象功能.md)进行是否相等的判断，唯一例外是+0 -0会被认定相同。

```javaScript
let set = new Set(),
    key = {
    1: "sad"
  },
  key2 = {};
set.add("5")
set.add(5)
// 重复add会被忽略
set.add(5)
//这里key1 和key2可以重复添加是由于对象不会被转为字符串，若用toString()还是无法重复添加的
set.add(key)
set.add(key2)
set.add(key.toString())
set.add(key2.toString())
console.log(set)  // Set { '5', 5, { '1': 'sad' }, {}, '[object Object]' }
```

使用数组来初始化一个 Set ，并且Set构造器会确保不重复地使用这些值

has()方法可以用于检查某个值是否存在于set中

```javaScript
let set = new Set([1,2,3,4,5,6,6,6,6]) //Set { 1, 2, 3, 4, 5, 6 }
console.log(set.has(5));    // true
console.log(set.has(7));    // false
```

### 移除Set的值

* Set提供了两种方法用于删除值:
  * clear()：清空整个set
  * delete(value)：删除set中某个特定值

### Set 上的 forEach() 方法

Set的forEach()和数组的类似。

forEach()方法会被传递一个回调函数，该回调接受三个参数：1. Set 中下个位置的值；2. 与第一个参数相同的值；3. 目标 Set 自身。

在Set中，前两个参数是相同的。

```javaScript
let set = new Set([1, 2]);
let processor = {
  output(value) {
    console.log(value + 1);
  },
  process(dataSet) {
    dataSet.forEach(function (value) {
      this.output(value);
    }, this);
  }
};
processor.process(set);
```

### 将 Set 转换为数组以及数组去重⭐

可以直接使用...扩展运算符

```javaScript
let set = newSet([1, 2, 3, 3, 3, 4, 5]),
  array = [...set];
console.log(array); // [1,2,3,4,5]
```

数组去重,通过扩展运算符和Set，一行代码实现去重

```javaScript
let a = [1, 1, 2, 3, 5, 5, 5, 4, 1, 1, 4, 4, 4, 4];
console.log([...new Set(a)])
```

### Weak Set

由于Set类型存储对象引用的方式，它也可以被称为 Strong Set 。对象存储在Set的一个实例中时，实际上相当于把对象存储在变量中。只要对于Set实例的引用仍然存在，所存储的对象就无法被垃圾回收机制回收，从而无法释放内存。

ES6 也包含了Weak Set，该类型只允许存储对象弱引用，而不能存储基本类型的值。对象的弱引用在它自己成为该对象的唯一引用时，不会阻止垃圾回收

Weak Set 很像在使用正规的 Set 。你可以在 Weak Set 上添加、移除或检查引用，也可以给构造器传入一个可迭代对象来初始化 Weak Set 的值

Weak Set 使用WeakSet构造器来创建，并包含add()方法、has()方法以及delete()方法。

```javaScript
let set = new WeakSet(),
  key = {}; // 将对象加入 set
set.add(key);
console.log(set.has(key)); // true
set.delete(key);
console.log(set.has(key)); // false
```

Set 和 WeakSet的区别

1. Weak Set 对象中只能存放对象值, 不能存放原始值, 而 Set 对象都可以
2. WeakSet 对象中存储的对象值都是被弱引用的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 正因为这样, WeakSet 对象是无法被枚举的, 没有办法拿到它包含的所有元素
3. Weak Set 不可迭代，因此不能被用在for-of循环中；
4. Weak Set 无法暴露出任何迭代器（例如keys()与values()方法），因此没有任何编程手段可用于判断 Weak Set 的内容；
5. Weak Set 没有forEach()方法；
6. Weak Set 没有size属性。

## ES6中的Map⭐

ES6 的Map类型是键值对的有序列表，而键和值都可以是任意类型。

### Map 的方法

* 两个主要方法：
  * set()用于设置key-value对
  * get()用于获取对应的value
* 三个次要方法
  * has(key)：判断指定的键是否存在于 Map 中；
  * delete(key)：移除 Map 中的键以及对应的值；
  * clear()：移除 Map 中所有的键与值。

```javaScript
let map = new Map(),
  obj1 = {},
  obj2 = {
    1: "sd"
  };
// 主要方法
map.set("5", "555")
map.set(5, "5")
map.set(obj1, "obj1")
map.set(obj2, "obj2")
console.log(map) //  Map { '5' => '555', 5 => '5', {} => 'obj1', { '1': 'sd' } => 'obj2' }
console.log(map.get(5)) //5
console.log(map.get(6) //undefined
//次要方法
console.log(map.has(5)) //true
map.delete(5)
console.log(map.has(5)) //false
map.clear()
console.log(map.size) //0
```

### Map 的初始化(用数组传值)

与 Set 类似，你能将数组传递给Map构造器，以便使用数据来初始化一个 Map 。传入的数组需要是一个第二维度为2的二维数组。

由数组构成的数组看起来有点奇怪，这对于准确表示键来说却是必要的：因为键允许是任意数据类型，将键存储在数组中，是确保它们在被添加到 Map 之前不会被强制转换为其他类型的唯一方法。

```javaScript
let map1 = new Map([
  [1, "111"],
  ["5", "456"]
]);
console.log(map1) // Map { 1 => '111', '5' => '456' }
```

### Map 上的 forEach 方法

Map 的forEach()方法类似于 Set 与数组的同名方法，它接受一个能接收三个参数的回调函数：

1. Map 中下个位置的值；
2. 该值所对应的键；
3. 目标 Map 自身。

```javaScript
map1.forEach(function (v, k, m) {
  console.log(k + " " + v)
  console.log(m === map1)
})
// 1 111
// true
// 5 456
// true
// 类似set如果想在回调函数中使用this，你可以给forEach()传入一个this值作为第二个参数
let processor = {
  output(value, k) {
    console.log(k + " " + value);
  },
  process(map1) {
    map1.forEach(function (value, k) {
      this.output(value, k);
    }, this);
  }
}
processor.process(map1);
// 1 111
// 5 456
```

### Weak Map

在Weak Map中，所有的键都必须是对象（尝试使用非对象的键会抛出错误），而且这些对象都是弱引用，不会干扰垃圾回收。当 Weak Map 中的键在 Weak Map 之外不存在引用时，该键值对会被移除。

注意： Weak Map 的键才是弱引用，而值不是。在 Weak Map 的值中存储对象会阻止垃圾回收，即使该对象的其他引用已全都被移除。 值会在

ES6 的WeakMap类型是键值对的无序列表，其中键必须是非空的对象，值则允许是任意类型。

```javaScript
let map = newWeakMap(),
  element = document.querySelector(".header");
map.set(element, "1111");
let value = map.get(element);
console.log(value); // "1111"
// 移除元素
element.parentNode.removeChild(element);
element = null; // 该 Weak Map 在此处为空
```

Weak Map 的用法与局限性

* Weak Map 提供has()和delete()方法
* Weak Map 只能使用对象类型的键。
* Weak Map 不能使用forEach()方法、size属性或clear()方法来管理其中的项

上一章：[符号与符号属性](./第六章：符号与符号属性.md)

下一章：[迭代器与生成器](./第八章：迭代器与生成器.md)