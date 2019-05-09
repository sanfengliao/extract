
// 定义虚拟DOM的类
class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

// 创建虚拟DOM
function createElement(type, props, children) {
  return new Element(type, props, children)
}

// 将虚拟DOM转换为真实DOM
function render(vDom) {
  // 创建DOM元素
  let el = document.createElement(vDom.type)

  // 遍历虚拟DOM的props, 给真实DOM设置属性
  for (let key in vDom.props) {
    setAttr(el, key, vDom.props[key])
  }

  // 遍历子节点
  // 如果是虚拟DOM，则递归渲染
  // 否则则代表是文本节点，直接创建
  vDom.children.forEach(item => {
    let node = item instanceof Element ? render(item) : document.createTextNode(item)
    el.appendChild(node)
  })
  return el
}

// 将DOM添加到页面中
function renderDom(el, target) {
  target.appendChild(el)
}

// 设置DOM的属性
function setAttr(el, key, value) {
  switch(key) {
    case 'value': 
      // 如果 el 是 input或者textarea 就直接设置其value
      if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
        el.value = value
      }
      else {
        el.setAttribute(key, value)
      }
      break
    case 'style':
      el.style.cssText = value
    default:
      el.setAttribute(key, value)
  }
}
