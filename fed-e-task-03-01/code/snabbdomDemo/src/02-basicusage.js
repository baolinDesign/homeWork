import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

const patch = init([])

let vnode = h('div#container.cls', [
  h('h1', 'hello snabbdom'),
  h('p', '这是p')
])

let app = document.querySelector('#app')
let oldVnode = patch(app, vnode)

setTimeout(() => {
  // vnode = h('div#container', [
  //   h('h1', 'hello world'),
  //   h('p', 'hello p')
  // ])
  // patch(oldVnode, vnode)
  // 清楚div中的内容
  patch(oldVnode, h('!'))
}, 2000)