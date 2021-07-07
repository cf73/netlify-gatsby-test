import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Typekit from 'react-typekit';
import Header from '../components/Header'
import './index.css'
import '../components/Header/nav.css'
import {Navigation} from '../components/nav.js'
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase'


const ThemeLinkComponent = ({ data }) => (
  <Link className={'navItem'} style={{textDecoration:'none', color:'white', display:'block'}} to={`/themes/${kebabCase(data.name)}`}>
  {data.name}
  </Link>
)

const TemplateWrapper = ({ children, data, location }) => (
  <div>
    <Helmet
      title="Race: The Power of an Illusion"
      
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header data={data} pathname={location.pathname} />
    
    <div
      style={{
        position: 'absolute',
        left:200,
        width:'calc(100% - 200px)',

      }}
    >
      {children()}
      {/* <Navigation /> */}
    </div>
    <Typekit kitId="pte4pny" />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const ThemesMenuquery = graphql`
  query ThemesMenuQuery {
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
        }
      }
    }
  }`