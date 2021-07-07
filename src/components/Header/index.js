import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';
import getScrollBarWidth from '../../utils/scrollbar-width'
import './burger.css';
import { scaleDown as Menu } from 'react-burger-menu'
import kebabCase from 'lodash/kebabCase'

const TopBar = styled.div`
  // height: 120px;
  // position: fixed;
  // top: 0;
  // z-index: 9999999999999999999999999999;
  // width: 100%;
  // background-color: rgba(255, 255, 255, 0.9490196078431372);
`

const NavMenu = styled.div`
  width: 200px;
  padding: 30px;
`

const linkStyle = {
  textDecoration: 'none',
}

const activeLinkStyle = {
  ...linkStyle,
  // color:' #ce2727',
  color: 'snow',
  borderLeft: '12px solid white',
  paddingLeft: 18,
  position: 'relative',
  left: -30
}

const ThemeLinkComponent = ({ data, closeMenu }) => (
  <Link className={'navItem'} onClick={() => closeMenu()} style={{textDecoration:'none', color:'white', display:'block', marginBottom:15}} to={`/themes/${kebabCase(data.name)}`}>
  {data.name}
  </Link>
)

class Header extends React.Component {
constructor(props) {
    super(props)
    this.closeMenu = this.closeMenu.bind(this)
    this.state = {
        modalOpen: false,
        menuOpen: false
      }
    }

    handleStateChange (state) {
      this.setState({menuOpen: state.isOpen})  
    }
    closeMenu () {
      this.setState({menuOpen: false})
    }
    toggleMenu () {
      this.setState({menuOpen: !this.state.menuOpen})
    }
      

    componentDidMount() {
    window.addEventListener('modal', ({detail: { open }}) => {
        this.setState({ modalOpen: open })
    })
    }
  showSettings (event) {
    event.preventDefault();

  }


  render () {
    const { modalOpen } = this.state
    const { pathname } = this.props
    const stylingForPath = (pathFragment => pathname.indexOf(pathFragment) !== -1 ? activeLinkStyle : linkStyle);
    return (
        <div style={{
          display:'flex', 
          justifyContent:'center',
          height: '100vh',
          position: 'fixed',
          flexDirection: 'column',
          // backgroundColor: 'rgba(41, 41, 41, 0.8196078431372549)',
          // backgroundColor: 'rgba(141, 179, 63, 0.82)',
          backgroundColor: 'rgba(168, 179, 63, 0.82)'
        }}>
      {/* <Menu 
       isOpen={this.state.menuOpen}
       onStateChange={(state) => this.handleStateChange(state)}
       pageWrapId={ "page-wrap" }
       >
      <h4>Themes from the film:</h4>
      
      {this.props.data.allTaxonomyTermThemes.edges.map(({ node }) => (
        <ThemeLinkComponent closeMenu={this.closeMenu} data={node}/>
      ))}



       <h4>Browse by: </h4>
        <Link className={'navItem'} onClick={() => this.closeMenu()} to="/the-film" style={stylingForPath(`/the-film`)} exact>
          The Film
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} to="/articles/" style={stylingForPath(`/articles`)} exact>
          Articles
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} to="/interviews/" style={stylingForPath(`/interviews`)} exact>
          Interviews
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} to="/FAQs/" style={stylingForPath(`/FAQs`)} exact>
          FAQs
        </Link>
        <Link className={'navItem'} onClick={() => this.closeMenu()} to="/clips/" style={linkStyle} exact>
          Clips
        </Link>

        <h4>For teachers</h4>
        <Link className={'navItem'} onClick={() => this.closeMenu()} to="/teaching/" style={linkStyle} exact>
          Lesson Plans
        </Link>
      </Menu> */}

      <NavMenu>
      {/* <h4 className="gold" style={{marginBottom:15}}>Themes from the film:</h4> */}
      
      {/* {data.allTaxonomyTermThemes.edges.map(({ node }) => (
        <ThemeLinkComponent data={node}/>
      ))} */}

      {/* <h4 className="gold" style={{marginTop:60, marginBottom: 15}}>Browse by:</h4> */}
        <Link className={'navItem'} style={stylingForPath(`/the-film`)} to="/the-film">
          About the film
        </Link>
        <Link className={'navItem'} style={stylingForPath(`/themes`)} to="/themes/">
          Themes
        </Link>
        <Link className={'navItem'} style={stylingForPath(`/articles`)} to="/articles/">
          Articles
        </Link>
        <Link className={'navItem'} style={stylingForPath(`/interviews`)} to="/interviews/">
          Interviews
        </Link>
        <Link className={'navItem'} style={stylingForPath(`/FAQs`)} to="/FAQs/">
          Q&A
        </Link>
        <Link className={'navItem'} style={stylingForPath(`/clips`)} to="/clips/">
          Clips
        </Link>

        {/* <h4 className="gold" style={{marginTop:60}}>For teachers</h4> */}
        <Link className={'navItem'} style={stylingForPath(`/teaching`)} to="/teaching/">
          Teaching
        </Link>
    </NavMenu>
      <TopBar>
      <div className={'logo'}>
        <Link
          to="/"
          style={{
            // color:'rgb(249, 128, 128)',
            textDecoration: 'none',
          }}
        >
          RACE
          <span className='filmSubtitle'>the power of an illusion</span>
        </Link>
      </div>


      <div className={'nav'} style={{marginRight: modalOpen ? getScrollBarWidth() : '' }}>
        
      </div>
    </TopBar>
    </div>
    );
  }
}
export default Header


