# 简答题
## 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
答：不是, data里面的属性是在创建Vue实例的时候，将其转化成的响应式数据，而在Vue实例化结束之后，再给data添加成员，仅仅是添加了一个普通的js属性，并不是响应式数据
对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式 属性
```
Vue.set(vm.someObject, 'b', 2)
```
您还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：
```
this.$set(this.someObject,'b',2)
```
Vue.set的内部原理: 类似于调用 defineReactive(obj, key, val) 方法，利用 Object.defineProperty 的 getter 和 setter 实现响应式数据。

## 2、请简述 Diff 算法的执行过程
答：

# 编程题
## 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

## 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
答: 参考项目: ./code/miniVue
部分代码：
```
// v-html
  htmlUpdater(node, value, key) {
    console.log(value)
    console.log(node)
    node.innerHTML = value
    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue
    })
  }

// v-on
// vue.js
...
this.$methods = options.methods || {}
this._proxyMethods(this.$methods)
_proxyMethods (methods) {
    console.log(methods)
    Object.keys(methods).forEach(key => {
      // 把 methods 的成员注入到 vue 实例中
      this[key] = methods[key]
    })
  }
// compiler.js
if (attrName.startsWith('on')) {
  const event = attrName.replace('on:', '') // 获取事件名
  // 事件更新
  return this.onUpdater(node, key, event)
}
// v-on
  onUpdater(node, key, event) {
    node.addEventListener(event, (e) => this.vm[key](e))
  }
...
```

## 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果