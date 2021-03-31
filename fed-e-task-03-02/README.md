# 简答题
## 1、请简述 Vue 首次渲染的过程。
答：(1) 首先进行Vue初始化, 初始化Vue实例成员和静态成员
    (2) 当初始化结束之后，开始调用构造函数，在构造函数中调用this._init()，这个方法相当于我们整个Vue的入口。
    (3) 在_init()中最终调用了this.$mount(); 共有两个$mount(),第一个$mount()是entry-runtime-with-compiler.js入口文件的$mount(),这个$mount()的核心作用是帮我们把模板编译成render函数，但它首先会判断一下当前是否传入了render选项，如果没有传入的话，它会去获取我们的template选项，如果template选项也没有的话，他会把el中的内容作为我们的模板，然后把模板编译成render函数，它是通过compileToFunctions()函数，帮我们把模板编译成render函数的,当把render函数编译好之后，它会把render函数存在我们的options.render中。
    (4) 那接下来会调用runtime/index.js中的$mount()方法，这个方法首先会重新获取el，因为如果是运行时版本的话，是不会走entry-runtime-with-compiler.js这个入口中获取el，所以如果是运行时版本的话，我们会在runtime/index.js的$mount()中重新获取el。
    (5) 接下来调用mountComponent(),mountComponent()是在src/core/instance/lifecycle.js中定义的，在mountComponent()中，首先会判断render选项，如果没有render选项，但是传入了模板，并且当前是开发环境的话会发送警告，警告运行时版本不支持编译器。
    (6) 触发beforeMount生命周期函数,也就是开始挂载之前
    (7) 定义了updateComponent,在这个方法中，定义了_render和_update，_render的作用是生成虚拟DOM，_update的作用是将虚拟DOM转换成真实DOM，并且挂载到页面上来。
    (8) 再接下来就是创建Watcher对象，在创建Watcher时，传递了updateComponent这个函数，这个函数最终是在Watcher内部调用的。在Watcher创建完之后还调用了get方法，在get方法中，会调用updateComponent()。
    (9) 后触发了生命周期的钩子函数mounted,挂载结束，最终返回Vue实例。


