# JS的类⭐

- [JS的类⭐](#js%E7%9A%84%E7%B1%BB%E2%AD%90)
  - [ES5 中的仿类结构](#es5-%E4%B8%AD%E7%9A%84%E4%BB%BF%E7%B1%BB%E7%BB%93%E6%9E%84)
  - [类的声明](#%E7%B1%BB%E7%9A%84%E5%A3%B0%E6%98%8E)
  - [类与自定义类型的异同](#%E7%B1%BB%E4%B8%8E%E8%87%AA%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%BC%82%E5%90%8C)
  - [类表达式⭐](#%E7%B1%BB%E8%A1%A8%E8%BE%BE%E5%BC%8F%E2%AD%90)
  - [作为一级公民的类](#%E4%BD%9C%E4%B8%BA%E4%B8%80%E7%BA%A7%E5%85%AC%E6%B0%91%E7%9A%84%E7%B1%BB)
    - [将类作为参数传入函数](#%E5%B0%86%E7%B1%BB%E4%BD%9C%E4%B8%BA%E5%8F%82%E6%95%B0%E4%BC%A0%E5%85%A5%E5%87%BD%E6%95%B0)
    - [通过立即调用类构造函数创建单例⭐](#%E9%80%9A%E8%BF%87%E7%AB%8B%E5%8D%B3%E8%B0%83%E7%94%A8%E7%B1%BB%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E5%88%9B%E5%BB%BA%E5%8D%95%E4%BE%8B%E2%AD%90)
  - [访问器属性](#%E8%AE%BF%E9%97%AE%E5%99%A8%E5%B1%9E%E6%80%A7)
  - [需计算的成员名](#%E9%9C%80%E8%AE%A1%E7%AE%97%E7%9A%84%E6%88%90%E5%91%98%E5%90%8D)
  - [生成器方法](#%E7%94%9F%E6%88%90%E5%99%A8%E6%96%B9%E6%B3%95)
  - [静态成员❓](#%E9%9D%99%E6%80%81%E6%88%90%E5%91%98%E2%9D%93)
  - [继承与派生类](#%E7%BB%A7%E6%89%BF%E4%B8%8E%E6%B4%BE%E7%94%9F%E7%B1%BB)
    - [屏蔽类方法](#%E5%B1%8F%E8%94%BD%E7%B1%BB%E6%96%B9%E6%B3%95)
    - [继承静态成员](#%E7%BB%A7%E6%89%BF%E9%9D%99%E6%80%81%E6%88%90%E5%91%98)
    - [从表达式派生类](#%E4%BB%8E%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%B4%BE%E7%94%9F%E7%B1%BB)
    - [继承内置对象](#%E7%BB%A7%E6%89%BF%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1)
    - [Symbol.species](#symbolspecies)
  - [在类构造器中使用 new.target](#%E5%9C%A8%E7%B1%BB%E6%9E%84%E9%80%A0%E5%99%A8%E4%B8%AD%E4%BD%BF%E7%94%A8-newtarget)

## ES5 中的仿类结构

ES5之前，JS中没有类的官方方法，但是用户经常使用其他方式来实现近似的功能

与类最接近的是：创建一个构造器，然后将方法指派到该构造器的原型上。这种方式通常被称为创建一个自定义类型。

```javaScript
// ES5中写法
function classType(data) {
  this.data = data;
}
classType.prototype.outputData = function () {
  console.log(this.data)
}
let ret = new classType("test")
ret.outputData()  //test
```

## 类的声明

类在 ES6 中最简单的形式就是类声明，它看起来很像其他语言中的类。

类声明以class关键字开始，其后是类的名称；剩余部分的语法看起来就像对象字面量中的方法简写，并且在方法之间不需要使用逗号。

类声明允许你在其中使用**特殊的constructor方法**名称直接定义一个构造器，而不需要先定义一个函数再把它当作构造器使用。

```javaScript
// ES6中写法
class classType {
  // 等价于 classType 构造器
  constructor(data) {
    this.data = data
  }
  // 等价于 classType.prototype.outputData
  outputData() {
    console.log(this.data)
  }
}
let ret = new classType("test")
ret.outputData()
```

## 类与自定义类型的异同

类与自定义类型的异同：

  1. 类声明**不会被提升**，这与函数定义不同。类声明的行为与let相似，因此在程序的执行到达声明处之前，类会存在于暂时性死区内。
  2. 类声明中的所有代码会**自动运行在严格模式下**，并且也无法退出严格模式。
  3. 类的所有方法都是**不可枚举**的，这是对于自定义类型的显著变化，后者必须用Object.defineProperty()才能将方法改变为不可枚举。
  4. 类的所有方法内部都**没有[[Construct]]**，因此使用new来调用它们会抛出错误。
  5. 调用类构造器时**不使用new，会抛出错误**。
  6. 试图**在类的方法内部重写类名，会抛出错误**，但是**可以在类的外部重写类名**

## 类表达式⭐

类表达式分为两种：

* 声明:以class为起始，后接上类名
* 表达式
  * 匿名类表达式：不需要在class关键字后使用标识符，即无需写类名
  * 具名类表达式：需要在class关键字后使用标识符，即需写类名

```javaScript
//声明式
class test {
  constructor() {}
}
//匿名表达式
let test = class{
  constructor(){}
}
//命名表达式，test1可以在外部使用，而test只能在内部使用
let test1 = class test{
  constructor(){}
}
```

## 作为一级公民的类

在编程中，能被当作值来使用的就称为一级公民，意味着它能作为参数传给函数、能作为函数返回值、能用来给变量赋值。

JS的函数就是一级公民，类也是

### 将类作为参数传入函数

```javaScript
//定义一个新的类
let a = class {
  output() {
    return "aaa";
  }
}
//该函数返回一个类的实例
function test(classa) {
  return new classa()
}
let ret = test(a)
console.log(ret.output())
```

### 通过立即调用类构造函数创建单例⭐

创建了一个匿名类表达式，并立即执行。
匿名类表达式只在类的内部创建了绑定。
从而不留下任何可被探查的类引用
类表达式后面的圆括号表示要调用前面的函数，并且允许传入参数。

```javaScript
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}("Nicholas");
person.sayName(); // "Nicholas"
```

## 访问器属性

自有属性需要在类构造器中创建，而类还允许你在原型上定义访问器属性。

```javaScript
class A {
  constructor(state) {
    this.state = state
  }
  // 创建getter
  get myName() {
    return this.state.name
  }
  // 创建setter
  set myName(name) {
    this.state.name = name
  }
}
// 获取指定对象的自身属性描述符。自身属性描述符是指直接在对象上定义（而非从对象的原型继承）的描述符。
let desriptor = Object.getOwnPropertyDescriptor(A.prototype, "myName")
console.log("get" in desriptor) // true
console.log("set" in desriptor) // true
console.log(desriptor.enumerable) // false 不可枚举
```

## 需计算的成员名

类方法与类访问器属性的可计算成员语法：无须使用标识符，而是用方括号来包裹一个表达式。

```javaScript
let mName = "output";
let tName = "pDesc"
class A {
  constructor(value) {
      this.value = value;
    }
    [mName]() {
      console.log(this.value);
    }
  get[tName]() {
    return this.value.name;
  }
  set[tName](name) {
    this.value.name = name;
  }
}
let test = new A("John");
test.output(); // "John"
var descriptor = Object.getOwnPropertyDescriptor(A.prototype, "pDesc");
console.log(descriptor)
// { get: [Function: get pDesc],
//   set: [Function: set pDesc],
//   enumerable: false,
//   configurable: true }
```

## 生成器方法

生成器是一个返回迭代器的函数。在类中，我们也可以使用生成器方法。只要在类名称前附加一个星号（ * ）。

```javaScript
class test {
  * count() {
    yield 1;
    yield 2;
  }
}
let i = new test()
console.log(i.count().next()) //  { value: 1, done: false }
```

## 静态成员❓

ES5之前直接在构造器上添加额外方法来模拟静态成员。 不知道为啥后面还会输出一个undefined

```javaScript
function PersonType(name) {
  this.name = name;
}
// 静态方法
PersonType.create = function (name) {
  return new PersonType(name);
};
// 实例方法
PersonType.prototype.output = function () {
  console.log(this.name);
};
var person = PersonType.create("John");
console.log(person.output())
// John
// undefined
```

ES6简化后的静态成员

```javaScript
class PersonClass {
  // 等价于 PersonType 构造器
  constructor(name) {
    this.name = name;
  }
  // 等价于 PersonType.prototype.sayName
  output() {
    console.log(this.name);
  }
  // 等价于 PersonType.create
  static create(name) {
    return new PersonClass(name);
  }
}
let person = PersonClass.create("john");
```

## 继承与派生类

类让继承工作变得更轻易，使用熟悉的 extends 关键字来指定当前类所需要继承的函数，即可。生成的类的原型会被自动调整，而你还能调用 super() 方法来访问基类的构造器。

```javaScript
class add {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  getRet() {
    return this.a + this.b;
  }
}
class addnum extends add {
  constructor(num) {
    super(num, num);
  }
}
var test = new addnum(3);
console.log(test.getRet()); // 6
console.log(test instanceof addnum); // true
console.log(test instanceof add); // true
```

继承了其他类的类被称为派生类（ derived classes ）。如果派生类指定了构造器，就需要使用 super() ，否则会造成错误。若你选择不使用构造器， super() 方法会被自动调用，并会使用创建新实例时提供的所有参数。下面两段代码作用相同

```javaScript
class addnum extends add {
  // 没有构造器
}
// 等价于：
class addnum extends add {
  constructor(...args) {
    super(...args);
  }
}
```

使用 super() 时需牢记以下几点：

1. 你只能在派生类中使用 super() 。若尝试在非派生的类（即：没有使用 extends关键字的类）或函数中使用它，就会抛出错误。
2. 在构造器中，你必须在访问 this 之前调用 super() 。由于 super() 负责初始化this ，因此试图先访问 this 自然就会造成错误。
3. 唯一能避免调用 super() 的办法，是从类构造器中返回一个对象。

### 屏蔽类方法

可以在继承的类中重写父类的方法。

```javaScript
class addnum {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
  //求和
  add() {
    return this.a + this.b
  }
}
class test extends addnum {
  constructor(a, b) {
    super(a, b)
  }
  //求积
  add() {
    return this.a * this.b
  }
}
let t = new test(2, 3)
console.log(t.add()) // 6
```

### 继承静态成员

如果**基类包含静态成员，那么这些静态成员在派生类中也是可用的。**

```javaScript
class addnum {
  constructor(a, b) {
    this.a = a
    this.b = b
  }
  //求和
  static add(a, b) {
    return a + b
  }
}
class test extends addnum {
  constructor(a, b) {
    super(a, b)
  }
}
console.log(test.add(2, 3)) // 5
```

### 从表达式派生类

在 ES6 中派生类的最强大能力，**能够从表达式中派生类。**

注意 无法从生成器函数进行继承

```javaScript
let add = class { 
  constructor(a, b) {
    this.a = a;
    this.b = b;
  } 
  getRet() {
    console.log(this.a + this.b)
  }
};
class addnum extends add {
  // 可不写
  // constructor(a, b) {
  //   super(a, b);
  // }
}
let test = new addnum(2, 3);
test.getRet();  //  5
```

### 继承内置对象

在 ES6 基于类的继承中， this 的值会先被基类（ Array ）创建，随后才被派生类的构造器（ MyArray ）所修改。结果是 this 初始就拥有作为基类的内置对象的所有功能，并能正确接收与之关联的所有功能。

```javaScript
class MyArray extends Array {
  // 空代码块
}
var colors = new MyArray();
colors[0] = "red";
console.log(colors.length); // 1
colors.length = 0;
console.log(colors[0]); // undefined
```

### Symbol.species

任意能返回内置对象实例的方法，在派生类上却会自动返回派生类的实例。

* Symbol.species 知名符号被用于定义一个能返回函数的静态访问器属性。每当类实例的方法（构造器除外）必须创建一个实例时，前面返回的函数就被用为新实例的构造器。下列内置类型都定义了 Symbol.species ：
  * Array
  * ArrayBuffer （详见第十章）
  * Map
  * Promise
  * RegExp
  * Set
  * 类型化数组（详见第十章）
  
## 在类构造器中使用 new.target

在第三章你已学到了 new.target ，以及在调用函数的方式不同时它的值是如何变动的。你也可以在类构造器中使用 new.target ，来判断类是被如何被调用的。在简单情况下,new.target 就等于本类的构造器函数

```javaScript
class A {
  constructor() {
    //如果当前的new.target为A类，就抛出异常
    if (new.target === A) {
      throw new Error("error")
    }
  }
}
let a = new A()
console.log(a) // Error: error
```

上一章：[迭代器与生成器](./第八章：迭代器与生成器.md)

下一章：[增强的数组功能](./第十章：增强的数组功能.md)