// 创建虚拟DOM
let virtualDom = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['周杰伦']),
  createElement('li', {class: 'item'}, ['林俊杰']),
  createElement('li', {class: 'item'}, ['王力宏']),
])

console.log(virtualDom)

// 将虚拟DOM渲染成真实DOM并添加到页面中
var el = render(virtualDom)
console.log(el)
renderDom(el, document.getElementById("app"))

let virtualDom2 = createElement('ul', {class: 'item-list'}, [
  createElement('li', {class: 'item active'}, ['七里香']),
  createElement('li', {class: 'item abc'}, ['曹操']),
  createElement('li', {class: 'item'}, ['王力宏']),
  createElement('li', {class: 'item'}, ['ABC']),
])

let patches = diff(virtualDom, virtualDom2)
console.log(patches)
patch(el, patches)
console.log(el)

