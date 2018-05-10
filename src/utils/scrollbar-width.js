let scrollBarWidth = null

// https://gist.github.com/kflorence/3086552
export default () => {
  if (typeof document === 'undefined') {
    return 0
  }

  if (scrollBarWidth !== null) {
    return scrollBarWidth
  }
  var inner = document.createElement('p')
  inner.style.width = '100%'
  inner.style.height = '200px'

  var outer = document.createElement('div')
  outer.style.position = 'absolute'
  outer.style.top = '0px'
  outer.style.left = '0px'
  outer.style.visibility = 'hidden'
  outer.style.width = '200px'
  outer.style.height = '150px'
  outer.style.overflow = 'hidden'
  outer.appendChild(inner)

  document.body.appendChild(outer)
  var w1 = inner.offsetWidth
  outer.style.overflow = 'scroll'
  var w2 = inner.offsetWidth

  if (w1 == w2) {
    w2 = outer.clientWidth
  }

  document.body.removeChild(outer)

  scrollBarWidth = w1 - w2
  return scrollBarWidth
}