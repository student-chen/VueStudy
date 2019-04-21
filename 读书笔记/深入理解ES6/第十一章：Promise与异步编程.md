# Promise与异步编程⭐

- [Promise与异步编程⭐](#promise%E4%B8%8E%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B%E2%AD%90)
  - [异步编程的背景](#%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B%E7%9A%84%E8%83%8C%E6%99%AF)
    - [事件模型](#%E4%BA%8B%E4%BB%B6%E6%A8%A1%E5%9E%8B)
    - [回调模式](#%E5%9B%9E%E8%B0%83%E6%A8%A1%E5%BC%8F)
  - [Promise 基础](#promise-%E5%9F%BA%E7%A1%80)
    - [Promise生命周期](#promise%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  - [创建 Promise](#%E5%88%9B%E5%BB%BA-promise)
  - [全局的 Promise 拒绝处理](#%E5%85%A8%E5%B1%80%E7%9A%84-promise-%E6%8B%92%E7%BB%9D%E5%A4%84%E7%90%86)
    - [Node.js 的拒绝处理](#nodejs-%E7%9A%84%E6%8B%92%E7%BB%9D%E5%A4%84%E7%90%86)
    - [浏览器的拒绝处理](#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E6%8B%92%E7%BB%9D%E5%A4%84%E7%90%86)
  - [串联 Promise](#%E4%B8%B2%E8%81%94-promise)
    - [捕获错误](#%E6%8D%95%E8%8E%B7%E9%94%99%E8%AF%AF)
    - [在 Promise 链中返回值](#%E5%9C%A8-promise-%E9%93%BE%E4%B8%AD%E8%BF%94%E5%9B%9E%E5%80%BC)
    - [在 Promise 链中返回 Promise](#%E5%9C%A8-promise-%E9%93%BE%E4%B8%AD%E8%BF%94%E5%9B%9E-promise)
  - [响应多个 Promise](#%E5%93%8D%E5%BA%94%E5%A4%9A%E4%B8%AA-promise)
    - [Promise.all() 方法](#promiseall-%E6%96%B9%E6%B3%95)
    - [Promise.race()](#promiserace)
  - [继承 Promise](#%E7%BB%A7%E6%89%BF-promise)
  - [异步任务运行](#%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1%E8%BF%90%E8%A1%8C)

## 异步编程的背景

JS 引擎建立在单线程事件循环的概念上。单线程（Single-threaded）意味着同一时刻只能执行一段代码.

Promise之前异步主要由事件模型和回调两种实现.

### 事件模型

对用户的操作进行响应,并添加到任务序列的末端.类似点击按钮,提交表单等等,只有当触发了这些DOM事件函数，才会执行他们。

```JavaScript
let button = document.getElementById("my-btn");
button.onclick = function (event) {
  console.log("Clicked");
};
```

### 回调模式

回调函数模式要比事件模型灵活，回调函数串联多个调用相对容易一点,但是容易陷入回调地狱.

另外注意下Node.js回调原则:错误优先.

```JavaScript
method1(function (err, result) {
  if (err) {
    throw err;
  }
  method2(function (err, result) {
    if (err) {
      throw err;
    }
    method3(function (err, result) {
      if (err) {
        throw err;
      }
        method4(result);
    });
  });
});
```

## Promise 基础

### Promise生命周期

**Promise短暂的生命周期**:

起始为挂起态(pending)也称为未决(unsettled), 然后就是已决(settled)。已决分为两种, 已完成(fulfilled)和已拒绝(rejected).

但是Promise的状态是在内部属性中体现的，你无法直接观测到，但是你可以通过所有promise都带有的then()方法判断Promise的当前状态。

Promise都是thenable但是thenable不都是Promise

Promis 也具有一个 catch() 方法，其行为等同于只传递拒绝处理函数给 then() 。例如，以下的 catch() 与 then() 调用是功能等效的。

```JavaScript
var p = new Promise(function (resolve, reject) {
  resolve(5)
})
p.then(function (value) {
  console.log(value) //5
})

var p1 = new Promise(function (resolve, reject) {
  reject(new Error('错误'))
})
p1.then(null, function (reason) {
  console.log(reason) //Error: 错误(…)
})
p1.catch(function (err) {
  console.error(err.message)
})//错误
```

## 创建 Promise

注意：**Promise实例只能通过resolve或者reject函数来返回，并且使用then()或者catch()获取，不能在new Promise里面直接return，这样是获取不到Promise返回值的。**

Promise可以通过resolve() 和 reject()进行创建，他们创建的Promise分别是完成态和拒绝态的。当Promise是完成态，所有附加到其上的拒绝处理函数都不会被调用，当其是拒绝态同理。

但是译者在实践中发现有所不同 **对挂起态或完成态的 Promise 使用 Promise.resolve() 没问题，会返回原Promise ；对拒绝态的 Promise 使用 Promise.reject() 也没问题。而除此之外的情况全都会在原 Promise 上包装出一个新的 Promise 。**

## 全局的 Promise 拒绝处理

当一个 Promise 被拒绝时若缺少拒绝处理函数，就会静默失败。这也是JS中唯一一个不清晰可见的错误。

### Node.js 的拒绝处理

* 在 Node.js 中， process 对象上存在两个关联到 Promise 的拒绝处理的事件：
  * unhandledRejection ：当一个 Promise 被拒绝、而在事件循环的一个轮次中没有任何拒绝处理函数被调用，该事件就会被触发；
  * rejectionHandled ：若一个 Promise 被拒绝、并在事件循环的一个轮次之后再有拒绝处理函数被调用，该事件就会被触发。

这两个事件旨在共同帮助识别已被拒绝但未曾被处理 promise。但是如果你通过了catch()方法来捕捉reject操作，那么，这2个事件就不会生效。

```JavaScript
// unhandledRejection
let rejected;
process.on("unhandledRejection", function (reason, promise) {
  console.log(reason.message); // "Explosion!"
  console.log(rejected === promise); // true
});
rejected = Promise.reject(new Error("Explosion!"));
// rejectionHandled
let rejected;
process.on("rejectionHandled", function (reason, promise) {
  console.log(reason.message); // "Explosion!"
});
rejected = Promise.reject(new Error("Explosion!"));
```

### 浏览器的拒绝处理

浏览器同样能触发两个事件，来帮助识别未处理的拒绝。这两个事件会被 window 对象触发，并完全等效于 Node.js 的相关事件：unhandledRjection、rejectionHandled。

* 浏览器事件的处理函数则只会接收到包含下列属性的一个对象：
  * type ： 事件的名称（ "unhandledrejection" 或 "rejectionhandled" ）；
  * promise ：被拒绝的 Promise 对象；
  * reason ： Promise 中的拒绝值（拒绝原因）。

浏览器的实现中存在的另一个差异就是：拒绝值（ reason ）在两种事件中都可用。

## 串联 Promise

每次对 then() 或 catch() 的调用实际上创建并返回了另一个 Promise ，仅当前一个Promise 被完成或拒绝时，后一个 Promise 才会被决议。

```javascript
// 一个基础的串联例子
let p1 = new Promise(function(resolve, reject) {
resolve(42);
});
p1.then(function(value) {
console.log(value);
}).then(function() {
console.log("Finished");
});
// 42
// Finished
// 展开
let p1 = new Promise(function(resolve, reject) {
resolve(42);
});
let p2 = p1.then(function(value) {
console.log(value);
})
p2.then(function() {
console.log("Finished");
});
```

### 捕获错误

Promise 链允许你捕获前一个 Promise 的完成或拒绝处理函数中发生的错误。

为了确保能正确处理任意可能发生的错误，应当始终在 Promise 链尾部添加拒绝处理函数。

```javascript
let p1 = new Promise(function (resolve, reject) { resolve(42); });
p1.then(function (value) {
  throw new Error("Boom!");
}).catch(function (error) {
  console.log(error.message);     // "Boom!"
});
```

### 在 Promise 链中返回值

能从一个 Promise 传递数据给下一个 Promise 。传递给执行器中的resolve()或reject()处理函数的参数，会被传递给对应 Promise 的完成/拒绝处理函数。
并且可以指定完成/拒绝处理函数的返回值，以便沿着一个链继续传递数据。

```javascript
let p1 = new Promise(function (resolve, reject) {
  resolve(1);
}); p1.then(function (value) {
  console.log(value);         // "1"
  return value + 1;
}).then(function (value) {
  console.log(value);         // "2"
});
```

### 在 Promise 链中返回 Promise

Promise同样可以链式的返回一个Promise对象,需要注意的是第二个then是被附加到最新的p3上而不是p2上。因此如果p2被拒绝，那么第二个then就不会被调用

```javascript
// 返回PROMISE
let p1 = new Promise((resolve, reject) => resolve(1))
let p2 = new Promise((resolve, reject) => reject(2))
p1.then(function (v) {
  console.log(v)//1
  return p2
}).then(function (v) {
  console.log(v)//2
})
// 展开
let p1 = new Promise((resolve, reject) => resolve(1))
let p2 = new Promise((resolve, reject) => reject(2))
let p3 = p1.then(function (v) {
  console.log(v)
  return p2
})
p3.then(function (v) {
  console.log(v)
})
```

## 响应多个 Promise

### Promise.all() 方法

参数只有一个，可迭代对象，可以是数组，或者Symbol类型等

只要有一个reject，不再返回其他resolve的结果

```JavaScript
 Promise.all([
      new Promise(function(resolve, reject) {
        resolve(1)
      }),
      new Promise(function(resolve, reject) {
        resolve(2)
        // reject(2)
      }),
      new Promise(function(resolve, reject) {
        resolve(3)
      })
    ]).then(arr => {
      console.log(arr) // [1, 2, 3]
      // console.log(arr) // Error 2
    })
```

### Promise.race()

语法和all相同，但是只返回第一个执行的Promise的结果，无论是reject还是resolve

## 继承 Promise

可以定义一个Promise用做派生类的基类。

```javascript
class MyPromise extends Promise {
      //重新封装then()
      success(resolve, reject) {
        return this.then(resolve, reject)
      }
      //重新封装catch()
      failer(reject) {
        return this.catch(reject)
      }
    }
```

基础使用

```javascript
new MyPromise(function(resolve,reject){
  resolve(1)
}).success(v=>console.log(v))//1
```

## 异步任务运行

Promise本身不是异步的，只有他的then()或者catch()方法才是异步，也可以说Promise的返回值是异步的。通常Promise被使用在node，或者是前端的ajax请求、前端DOM渲染顺序等地方。

上一章：[增强的数组功能](./第十章：增强的数组功能.md)

下一章：[代理与反射接口](./第十一章：代理与反射接口.md)