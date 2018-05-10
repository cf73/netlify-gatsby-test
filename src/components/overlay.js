const React = require('react')
import styled, { css } from 'styled-components'
import getScrollBarWidth from '../utils/scrollbar-width'

// hacky:
// because url is changed when we open modals, component get's remounted
// so we need to track previous props outside of actual component
const previousVisible = {}

class UnstyledOverlay extends React.Component {
  componentDidMount() {
    this.onVisibleChange(this.props.visible)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this.onVisibleChange(nextProps.visible)
    }
  }

  onVisibleChange(visible) {
    const wereAllHidden = Object.values(previousVisible).every(val => val === false)
    previousVisible[this.props.id] = visible
    const areAllHidden = Object.values(previousVisible).every(val => val === false)

    if (wereAllHidden !== areAllHidden) {
      if (visible) {
        document.body.classList.add('modal-open')
        document.body.style.paddingRight = `${getScrollBarWidth()}px`
        window.dispatchEvent(new CustomEvent('modal', { detail: { open: true, scrollBarWidth: getScrollBarWidth() } }))
      } else {
        document.body.classList.remove('modal-open')
        document.body.style.paddingRight = ``
        window.dispatchEvent(new CustomEvent('modal', { detail: { open: false, scrollBarWidth: 0 } }))
      }
    }
  }

  render() {
    const { children, style, className } = this.props
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
}

const Overlay = styled(UnstyledOverlay)`
  background-color: rgba(241, 239, 239, 0.94);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index:999999999999999999999999;
  opacity: 0;
  display: none;
  overflow-y: auto;

  ${props => props.visible && css`
    opacity: 1;
    display: inline;
  `}
`

const OverlayBody = styled.div`
  opacity: 1;
  padding: 20px;
  top: 0;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${props => props.wide ? css`
      width: 80%;
  ` : css`
      width: 66%;
  `}
`

const OverlayHeader = styled.div`
  position: sticky;
  top: 20px;
  margin-bottom: 1em;
`

export default { Overlay, OverlayHeader, OverlayBody }