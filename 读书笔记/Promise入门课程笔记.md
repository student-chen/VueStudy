# Promise入门
### 全文主要根据慕课网课程[Promise入门](https://www.imooc.com/learn/949)和CruxF的课程笔记整理。

## Promise是什么
 这个英语单词翻译成中文意思就是：许诺；允诺；有可能。因此从字面上就可以知道它代表了即将要发生的事情，从而联想到了JavaScript中异步程序。
 Promise对象用于异步计算
 一个Promise表示一个现在、将来或永远不可能使用的值

按照它的实际用途来看主要有以下几点
* 用于异步计算
* 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
* 可以在对象之间传递和操作Promise，帮助我们处理队列

### Promise产生的背景

* JavaScript包含大量异步操作
  * JavaScript为检查表单而生
  * 创造主要目标是操作DOM

异步操作能够避免界面冻结
异步的本质用就是：

* 将耗时很长的A交付的工作交给系统之后，就去继续做B交付的工作。等到系统完成前面的工作之后，再通过回调或者事件，继续做A交付的剩下的工作。
* 从观察者的角度看起来，AB工作的完成顺序，和交付它们的时间顺序无关，所以叫“异步”。

### 异步操作的常见语法

#### 事件侦听与响应：

```JavaScript
  document.getElementById('start').addEventListener('click', start, false);

  function start() {
    //响应时间 进行操作
  }
  //jquery 用on进行事件侦听
  $('#start').on('click', start)
```

#### 回调：

```JavaScript
  //比较常见的 ajax
  $.ajax('http://bing.com', {
    success: function (res) {
      //回调函数
    }
  })
  //或 页面加载完回调
  $(function () {
    //回调函数
  })
```

#### 额外知识点：[阮一峰博客](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)

* 浏览器中的JavaScript
  * 异步操作以事件为主
  * 回调主要出现再ajax和file api
* 有了nodejs后
  * 无阻塞和高并发是nodejs的招牌
  * 异步操作是其保障
  * 大量操作依赖回调函数

解决因为异步操作所带来的回调地狱，从而导致维护性差，下面请看回调代码

```JavaScript
a(function (resultsFromA) {
  b(resultsFromA, function (resultsFromB) {
    c(resultsFromB, function (resultsFromC) {
      d(resultsFromC, function (resultsFromD) {
        e(resultsFromD, function (resultsFromE) {
          f(resultsFromE, function (resultsFromF) {
            console.log(resultsFromF);
          })
        })
      })
    })
  })
});
```

#### 异步操作依赖的回调函数问题：

* 嵌套层次深，难以维护
* 无法正常使用return和throw
* 无法正常检索堆栈信息
* 多个回调之间难以建立联系

#### Promise的概念和优点

【特点】

* promise实例一经创建，执行器立即执行

【优点】

* Promise是一个代理对象，它和原先要进行的操作并无关系
* Promise通过引入一个回调，避免了更多的回调(通过一个回调可以将其他回调都展开为基于promise的回调)

【状态】

* pending：待定，称为初始状态
* fulfilled：实现，称为操作成功状态
* rejected：被否决，称为操作失败状态
* 当Promise状态发生改变的时候，就会触发.then()里的响应函数来处理后续步骤
* Promise状态已经改变，就不会再变

#### Promise的基本语法

```JavaScript
new Promise(
    /* 执行器 executor */
    function (resolve, reject) {
      // 一段耗时很长的异步操作
      resolve(); // 数据处理完成
      reject(); // 数据处理出错
    }
 ).then(function A() {
    // 成功，下一步
  }, function B() {
    // 失败，做相应处理
  });
  ```

#### Promise一个简单的例子 定时器

```JavaScript
console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  })
  .then(name => {
    console.log(name + ' world');
  });
  //输出
  // here wo go
  //2秒后
  // hello world
  ```

#### Promise两步执行的范例

```JavaScript
console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  })
  .then(value => {
    console.log(value); //输出hello
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('world');
      }, 2000);
    });
  })
  .then(value => {
    console.log(value + ' world'); //输出world world
  });
// here we go wait 2s
// hello wait 2s
// world world
```

这个范例主要是简单的演示了Promise如何解决回调地狱这个让人头大的问题。

#### 对已经完成的Promise执行then()

```JavaScript
console.log('start');
let promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('the promise fulfilled');
    resolve('hello, world');
  }, 1000);
});

setTimeout(() => {
  promise.then(value => {
    console.log(value);
  });
}, 3000);
```

讲师的原话：这段代码展示了Promise作为队列这个重要的特性，就是说我们在任何一个地方生成了一个Promise队列，都可以把它当做成一个变量传递到其他地方执行。\
可以随时追加新的then\
不管Promise前面的状态到底有没有完成，队列都会按照固定的顺序去执行。\

#### then()不返回Promise

```JavaScript
console.log('here we go');// 1
new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  })
  .then(value => {
    console.log(value);// 2 hello
    console.log('everyone'); // 2
    // 由于function 不是then的return 因此不会等待function的定时器。直接跳转到 return false
    (function () {
      return new Promise(resolve => {
        setTimeout(() => {
          // 但是定时器还是在执行的，由于定时器有等待时间，因此是最后一个输出的
          console.log('Mr.Laurence'); // 4
          resolve('Merry Xmas');
        }, 2000);
      });
    }());
    // 若注释这句也不会返回上面的resolve 而是直接返回undefined world
    return false;
  })
  .then(value => {
    console.log(value + ' world'); // 3
  });
// here we go wait 2s
// hello
// everyone
// false world wait 2s
// Mr.Laurence
```

#### 要想调用resolve()里的数据，只要这么写就可以了

```JavaScript
console.log('here we go');
new Promise(resolve => {
    setTimeout(() => {
      resolve('hello');
    }, 2000);
  })
  .then(value => {
    console.log(value);
    console.log('everyone');
    (function () {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('Mr.Laurence');
          resolve('Merry Xmas');
        }, 2000);
      });
    }()).then(value => {
      console.log(value + ' world');
    });
  })
```

## then()解析

* then()接受两个函数作为参数，分别代表fulfilled和rejected
* then()返回一个新的Promise实例，所以它可以链式调用
* 当前面的Promise状态改变时，then()根据其最终状态，选择特定的状态响应函数执行
* 状态响应函数可以返回新的Promise或其他值
* 如果返回新的Promise，那么下一级then()会在新的Promise状态改变之后执行
* 如果返回其他任何值，则会立刻执行下一级then()

### then()的嵌套

then()里面有then()的情况：\
因为then()返回的还是Promise实例，故会等里面的then()执行完，再执行外面的，因此对于我们来说，此时最好将其展开，会更好的进行阅读。\
以下是then嵌套的代码

```JavaScript
console.log('start');
new Promise(resolve => {
    console.log('Step 1'); // 1
    setTimeout(() => {
      resolve(100);
    }, 1000);
  })
  .then(value => {
    return new Promise(resolve => {
        console.log('Step 1-1');//  2
        setTimeout(() => {
          resolve(110);
        }, 1000);
      })
      .then(value => {
        console.log('Step 1-2');//  3
        return value;
      })
      .then(value => {
        console.log('Step 1-3');//  4
        return value;
      });
  })
  .then(value => 
    console.log(value);// 5
    console.log('Step 2');// 6
  });

// 解套后的代码为：

console.log('start');
new Promise(resolve => {
    console.log('Step 1');
    setTimeout(() => {
      resolve(100);
    }, 1000);
  })
  .then(value => {
    return new Promise(resolve => {
      console.log('Step 1-1');
      setTimeout(() => {
        resolve(110);
      }, 1000);
    })
  })
  .then(value => {
    console.log('Step 1-2');
    return value;
  })
  .then(value => {
    console.log('Step 1-3');
    return value;
  })
  .then(value => {
    console.log(value);
    console.log('Step 2');
  });
// start
// Step 1
// Step 1-1
// Step 1-2
// Step 1-3
// 110
// Step 2
```

两段代码的执行结果一致。

## Promise小测试

#### 看以下代码进行分析四种Promise的区别是什么？是什么原因导致了不同的执行流程？

```JavaScript
// 问题一
doSomething()
  .then(function () {
    return doSomethingElse();
  })
// 问题二
doSomething()
  .then(function () {
    doSomethingElse();
  })

// 问题三
doSomething()
  .then(doSomethingElse())

// 问题四
doSomething()
  .then(doSomethingElse)
```

#### 答案
```JavaScript
// 问题一
doSomething()
  .then(function () {
    return doSomethingElse();
  })
  .then(finalHandler);
//执行流程为doSomething ==> doSomethingElse(undefined) ==> finalHandler(resultDoSomethingELlse)

// 问题二
doSomething()
  .then(function () {
    doSomethingElse();
  })
  .then(finalHandler);
//执行流程为doSomething ==> doSomethingElse(undefined) ==> finalHandler(undefined)
//注意：doSomethingElse(undefined)和finalHandler(undefined)同时执行

// 问题三
doSomething()
  .then(doSomethingElse())
  .then(finalHandler);
//执行流程为doSomething ==> doSomethingElse(undefined) ==> finalHandler(resultOfDoSomething)
//注意：doSomethingElse(undefined)和doSomething()同时执行


// 问题四
doSomething()
  .then(doSomethingElse)
  .then(finalHandler);
//执行流程为doSomething ==> doSomethingElse(resultOfDoSomething) ==> finalHandler(resultOfDoSomethingElse)
```

### Promise错误处理

这一块看评论的意思是讲错了,因此直接跳过了.

### Promise.all()解析

Promise.all()具有批量执行的特点，用于将多个Promise实例，包装成一个新的Promise实例，返回的就是普通Promise。\
它接受一个数组作为参数，数组里可以是Promise对象，也可以是别的值，只有Promise会等待状态的改变。\
当所有子Promise都完成，那么返回新的Promise才认为是完成了，返回值是全部值的数组；有任何一个失败，则新的Promise就认为失败了，返回值是第一个失败的子Promise的结果。下面看代码：

```JavaScript
console.log('here we go');
Promise.all([1, 2, 3]).then(all => {
  console.log('1：', all);
  return Promise.all([function () {
    console.log('ooxx');
  }, 'xxoo', false]);
}).then(all => {
  console.log('2：', all);
  let p1 = new Promise(resolve => {
    setTimeout(() => {
      resolve('I\'m P1');
    }, 1500);
  });
  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('I\'m P2');
    }, 1450);
  });
  return Promise.all([p1, p2]);
}).then(
  all => {
    console.log('3：', all);
    let p1 = new Promise(resolve => {
      setTimeout(() => {
        resolve('I\'m P1');
      }, 1500);
    });
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('I\'m P2');
      }, 1000);
    });
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('I\'m P3');
      }, 3000);
    });
    return Promise.all([p1, p2, p3]);
  }
).then(all => {
  console.log('all', all);
}).catch(err => {
  console.log('Catch：', err);
});
// here we go
// 1： [ 1, 2, 3 ]
// 2： [ [Function], 'xxoo', false ]
// 3： [ 'I\'m P1', 'I\'m P2' ]
// Catch： I'm P2
```

#### 和.map()连用

```JavaScript
Promise.all(files.map(
  file => {
    return new Promise(resolve => {
      fs.stat(path.join(dir, file), (err, stat) => {
        if (err) throw err;
        if (stat.isDirectory()) {
          return resolve({
            size: 0
          });
        }
        stat.file = file;
        resolve(stat);
      })
    })
  }
))
```

#### Promise实现队列

有时候我们不希望所有动作一起发生，而是按照一定顺序，逐个进行.

```JavaScript
let promise = doSomething();
promise = promise.then(doSomethingElse);
promise = promise.then(doSomethingElse2);
promise = promise.then(doSomethingElse3);
```

#### 实现队列方式一：使用forEach()

```JavaScript
function queue(things) {
  let promise = Promise.resolve();
  things.forEach(thing => {
   promise.then(() => {
      return new Promise(resolve => {
        doThing(thing, () => {
          resolve();
        });
      });
    });
  });
  return promise;
}
queue(['lots', 'of', 'things', ....]);
```

常见错误：没有把then()产生的新Promise实例赋给promise，没有生成队列。

#### 实现队列方式二：使用reduce()

```JavaScript
function queue(things) {
  return things.reduce((promise, thing) => {
    return promise.then(() => {
      return new Promise(resolve => {
        doThing(thing, () => {
          resolve();
        });
      });
    });
  }, Promise.resolve());
}
queue(['lots', 'of', 'things', ....]);
```

常见错误：Promise实例创建后会立刻运行执行器代码

#### 使用Promise实现一个简单的爬虫

```JavaScript
// 开发一个爬虫，爬取某网站。（半成品）
let url = ['http://blog.meathill.com/'];
function fetchAll(urls) {
    return urls.reduce((promise, url) => {
        return promise.then( () => {
            return fetch(url);
        });
    }, Promise.resolve());
}
function fetch(url) {
    return spider.fetch(url)
        .then( content => {
            return saveOrOther(content);
        })
        .then( content => {
            let links = spider.findLinks(content);
            return fetchAll(links);
        });
}
fetchAll(url);
```

#### Promise.resolve()

Promise.resolve()返回一个fulfilled状态的Promise实例，或原始的Promise实例，具有如下特点：

* 参数为空，返回一个状态为fulfilled的Promise实例
* 参数是一个跟Promise无关的值，同上，不过fulfilled响应函数会得到这个参数
* 参数为Promise实例，则返回该实例，不做任何修改
* 参数为thenble，则立刻执行它的then()

```javascript
console.log('start'); \\1
Promise.resolve(value).then(() => {
  console.log('Step 1'); \\ 2
  return Promise.resolve('Hello',value);
}).then(value => {
  console.log(value, 'World'); \\ 3
  return Promise.resolve(new Promise(resolve => {
    setTimeout(() => {
      resolve('Good');
    }, 2000);
  }));
}).then(value => {
  console.log(value, ' evening'); \\ 4
  return Promise.resolve({
    then() {
      console.log(', everyone');\\ 5
    }
  })
})
// start
// Step 1
// Hello World
// Good  evening
// , everyone
```

#### Promise.reject()解析

Promise.reject()除了不认thenable，其他的特点都和Promise.resolve()类似

```javascript
let promise = Promise.reject('something wrong');
promise.then(() => {
  console.log('it\'s ok');
}).catch(() => {
  console.log('no, it\'s not ok');
  return Promise.reject({
    then() {
      console.log('it will be ok');
    },
    catch() {
      console.log('not yet');
    }
  });
});
// no, it's not ok
```

#### Promise.race()解析

类似Promise.all()，区别在于它有任意一个完成就算完成，观察以下代码：

```javascript
console.log('start');
let p1 = new Promise(resolve => {
  // 这是一个长时间的调用
  setTimeout(() => {
    resolve('I\'m P1');
  }, 10000);
});
let p2 = new Promise(resolve => {
  // 这是个稍短的调用
  setTimeout(() => {
    resolve('I\'m P2');
  }, 2000)
});
Promise.race([p1, p2]).then(value => {
  console.log(value);
});
// start
// I'm P2
//
```

Promise.race()常见用法是把异步操作和定时器放在一起，如果定时器先触发，就认为超时，告知用户。。

#### 现实生活中的Promise应用

把回调函数包装成Promise，使其可读性更好和返回的结果可以加入任何Promise队列
把任何异步操作包装成Promise，假设有这需求：用户点击按钮，弹出确认窗体 ==> 用户确认和取消有不同的处理。那么就能编写如下代码：

```javascript
// 弹出窗体
let confirm = popupManager.confirm('您确定么？');
confirm.promise.then(() => {
  // do confirm staff
}).catch(() => {
  // do cancel staff
});
// 窗体的构造函数
class Confirm {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.confirmButton.onClick = resolve;
      this.cancelButton.onClick = reject;
    })
  }
}
```

#### 额外资料:[大白话讲解Promise](https://www.jianshu.com/p/501fa67b2231)
