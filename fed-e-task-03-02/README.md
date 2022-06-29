# 简答题

## 1、请简述 Vue 首次渲染的过程

答：(1) 首先进行Vue初始化, 初始化Vue实例成员和静态成员
    (2) 当初始化结束之后，开始调用构造函数，在构造函数中调用this._init()，这个方法相当于我们整个Vue的入口。
    (3) 在_init()中最终调用了this.$mount(); 共有两个$mount(),第一个$mount()是entry-runtime-with-compiler.js入口文件的$mount(),这个$mount()的核心作用是帮我们把模板编译成render函数，但它首先会判断一下当前是否传入了render选项，如果没有传入的话，它会去获取我们的template选项，如果template选项也没有的话，他会把el中的内容作为我们的模板，然后把模板编译成render函数，它是通过compileToFunctions()函数，帮我们把模板编译成render函数的,当把render函数编译好之后，它会把render函数存在我们的options.render中。
    (4) 那接下来会调用runtime/index.js中的$mount()方法，这个方法首先会重新获取el，因为如果是运行时版本的话，是不会走entry-runtime-with-compiler.js这个入口中获取el，所以如果是运行时版本的话，我们会在runtime/index.js的$mount()中重新获取el。
    (5) 接下来调用mountComponent(),mountComponent()是在src/core/instance/lifecycle.js中定义的，在mountComponent()中，首先会判断render选项，如果没有render选项，但是传入了模板，并且当前是开发环境的话会发送警告，警告运行时版本不支持编译器。
    (6) 触发beforeMount生命周期函数,也就是开始挂载之前
    (7) 定义了updateComponent,在这个方法中，定义了_render和_update，_render的作用是生成虚拟DOM，_update的作用是将虚拟DOM转换成真实DOM，并且挂载到页面上来。
    (8) 再接下来就是创建Watcher对象，在创建Watcher时，传递了updateComponent这个函数，这个函数最终是在Watcher内部调用的。在Watcher创建完之后还调用了get方法，在get方法中，会调用updateComponent()。
    (9) 后触发了生命周期的钩子函数mounted,挂载结束，最终返回Vue实例。

## 2、请简述 Vue 响应式原理

答: Vue 响应式原理其实是在 vm._init() 中完成的, 调用顺序 initState() --> initData() --> observe(). observe() 就是响应式的入口函数.
(1)observe(value): 这个方法接收一个参数 value, 就是需要处理成响应式的对象; 判断 value 是否为对象, 如果不是直接返回; 判断 value 对象是否有 __ob__ 属性, 如果有直接返回; 如果没有, 创建 observer 对象; 返回 observer 对象;
(2)Observer: 给 value 对象定义不可枚举的 __ob__ 属性, 记录当前的 observer 对象; 数组的响应式处理,覆盖原生的 push/splice/unshift 等方法, 它们会改变原数组, 当这些方法被调用时会发送通知; 对象的响应式处理, 调用 walk 方法，遍历对象的每个属性, 调用 defineReactive;

(3)defineReactive: 为每一个属性创建 dep 对象, 如果当前属性的值是对象, 再调用 observe; 定义 getter, 收集依赖, 返回属性的值; 定义 setter, 保存新值, 如果新值是对象, 调用 observe, 派发更新(发送通知), 调用 dep.notify();

(4)依赖收集: 在 Watcher 对象的 get 方法中调用 pushTarget 记录 Dep.target 属性;访问 data 中的成员时收集依赖, defineReactive 的 getter 中收集依赖; 把属性对应的 watcher 对象添加到 dep 的 subs 数组中; 给 childOb 收集依赖, 目的是子对象添加和删除成员时发送通知;

(5)Watcher: dep.notify 在调用 watcher 对象的 update() 方法时,调用 queueWatcher(), 判断 watcher 是否被处理, 如果没有的话添加到 queue 队列中, 并调用 flushSchedulerQueue(); 触发 beforeUpdate 钩子, 调用 watcher.run(), run() --> get() --> getter() --> updateComponent, 清空上一次的依赖, 触发 actived 钩子, 触发 updated 钩子.

## 3、请简述虚拟 DOM 中 Key 的作用和好处

答：作用：主要用来在虚拟 DOM 的 diff 算法中,在新旧节点的对比时辨别 vnode ,使用key 时, Vue 会基于 key 的变化重新排列元素顺序, 尽可能的复用页面元素, 只找出必须更新的DOM, 最终可以减少DOM操作. 常见的列子是结合 v-for 来进行列表渲染, 或者用于强制替换元素/组件.
好处:(1) 数据更新时, 可以尽可能的减少DOM操作;
(2) 列表渲染时, 可以提高列表渲染的效率，提高页面的性能.

## 4、请简述 Vue 中模板编译的过程

答: (1) 编译过程的入口函数compileToFunctions是先从缓存中加载编译好的render函数,如果缓存中没有的话, 就去调用compile函数, 在compile函数中, 首先去合并选项, 然后调用baseCompile函数编译模板.

(2) 把模板合并好的选项传递给baseCompile, baseCompile里面完成了模板编译核心的三件事, 首先调用parse函数把模板转换成AST抽象语法树, 然后调用optimize函数对抽象语法树进行优化, 标记静态语法树中的静态根节点（只包含纯文本的静态节点不是静态根节点，因为此时的优化成本大于收益）,patch过程中会跳过静态根节点, 最后调用generate函数, 将AST对象转化为js形式的代码.

当compile执行完毕后, 会回到编译的入口函数compileToFunctions, 通过调用createFunction函数,继续把上一步中生成的字符串形式JS代码转化为函数形式. 当render和staticRenderFns初始化完毕, 挂载到Vue实例的options对应的属性上.
