
function diff(oldNode, newNode) {
  // 收集两个VDOM节点之间的不同

  // 递归比较两个虚拟DOM，将比较结果放入Pathes中
  let patches = walk(oldNode, newNode)

  return patches
}


function walk(oldNode, newNode) {
  let currentPatch = {} // 每一个DOM元素都有一个patch

  if (!newNode) {
    // 如果不存在newNode，说明该Node被移除
    currentPatch.diff = {type: 'REMOVE', oldNode}
  } else if(newNode && !oldNode) {
    // 说明是新结点
    currentPatch.diff = {type: 'ADD', newNode}
  } else if (isString(oldNode) && isString(newNode)) {
    // 如果是文本, 则判断文本是否一致
    if (oldNode !== newNode) {
      currentPatch.diff = {type: 'TEXT', newNode}
    }
  } else if (oldNode.type === newNode.type) {
    // 如果是虚拟DOM元素
    // 比较属性是否相同
    let attrDiff = diffAttr(oldNode.props, newNode.props)
    if (Object.keys(attrDiff).length > 0) {
      currentPatch.diff = {type: 'ATTR', attrDiff}
    } else {
      // 说明该元素的属性相同, 可以理解为node没有被修改
      currentPatch.diff = {}
    }
    // 比较子节点是否相同
    currentPatch.children = []
    diffChildren(oldNode.children, newNode.children, currentPatch.children)
  } else if(oldNode.type !== newNode.type) {
    // 否则说明节点被替换了
    currentPatch.diff = {type: 'REPLACE', newNode}
  } else {
    // 说明没有被修改, 添加一个空对象
    currentPatch.diff = {}
  }

  return currentPatch
}


function isString(obj) {
  return obj && typeof obj === 'string'
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {}
  // 新老属性是否相同
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]
    }
  }

  // 老节点中没有但新结点中有的属性
  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key]
    }
  }

  return patch
}

function diffChildren(oldChildren, newChildren, childrenPatch) {
  // 比较子节点
  newChildren.forEach((item, i) => {
    childrenPatch.push(walk(oldChildren[i], item))
  })
}