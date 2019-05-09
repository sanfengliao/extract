


function patch(node, patch) {
  run(node, patch)
}

/**
 * 
 * @param {HTMLElement} node 节点
 * @param {Object} patches 节点之间的不同
 * @param {Number} index 节点树的第几层
 * @param {Number} i 该层的第几个节点
 */
function run(node, patch) {
  let childNodes = node.childNodes
  let patchChildren = patch.children
  // 先修改每个子节点
  for (let i = 0; i < childNodes.length; ++i) {
    run(childNodes[i], patchChildren[i])
  }
  
  // patcheChildren的长度大于childNodes的长度, 说明有添加了新的节点
  if (patchChildren && patchChildren.length && patchChildren.length > childNodes.length) {
    for (let i = childNodes.length; i < patchChildren.length; ++i) {
      doPatch(node, patchChildren[i])
    }
  }
  if (patch) {
    doPatch(node, patch)
  }
}

function doPatch(node, patch) {
  if (Object.keys(patch).length > 0) {
    let { diff } = patch
    switch(diff.type) {
      case 'ADD':
        var newNode = diff.newNode
        newNode = newNode instanceof Element ? render(newNode) : document.createTextNode(newNode)
        node.appendChild(newNode)
        break
      case 'ATTR':
        for (let key in diff.attrDiff) {
          let value = diff.attrDiff[key]
          setAttr(node, key, value)
        }
        break
      case 'TEXT':
        node.textContent = diff.newNode
        break
      case 'REPLACE':
        var newNode = diff.newNode
        let replaceNode = newNode instanceof Element ? render(newNode) : document.createTextNode(newNode)
        node.parentNode.replaceNode(replaceNode, node)
        break
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break
    }
  }
}