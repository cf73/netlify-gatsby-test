const React = require('react')
const range = require('range')
const ReactFlex = require('react-flex')
require('react-flex/index.css')
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

import styled, { css } from 'styled-components';

class RCCard extends React.Component {
    render() {
        return (
        <Link to={`/${this.props.slug}s/${kebabCase(this.props.title)}`} className={this.props.className} style={this.props.style}>
            {this.props.type ?
            <h4>{this.props.type}</h4> :
            null }
            <div className={'RCimage'} style={{
              backgroundImage: `url(${this.props.imgSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            <p>{this.props.title}</p>

            {this.props.children}
        </Link>
        )
    }
}

const BASE_CARD_WIDTH = 350;
const FLEX = 100;
const MAX_WIDTH_CONSTANT = .7;
const ARTICLE_MULTIPLIER = 1.5;
const QUICK_FACT_MULTIPLIER = 1.5;

const StyledRCCard = styled(RCCard)`
  display: inline-block;
  height: auto;
  flex: ${FLEX} ${FLEX} ${BASE_CARD_WIDTH}px;
  border: solid thin lightgrey;
  background-color: #f7f7f7;
  -webkit-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  -moz-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  margin-bottom: 20px;
  font-family: "ff-tisa-web-pro";
  vertical-align: top;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
  max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT}px

  // Link styling
  color: inherit;
  text-decoration: inherit;

  ${props => props.background && css`
    background-image: url('${props.background}');
    background-size: cover;
  `}
  
  ${props => props.type == `Article` && css`
    flex: ${FLEX * ARTICLE_MULTIPLIER} ${FLEX * ARTICLE_MULTIPLIER} ${BASE_CARD_WIDTH * ARTICLE_MULTIPLIER}px;
    max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * ARTICLE_MULTIPLIER}px;
  `}

  ${props => props.type == `QuickFact` && css`
    flex: ${FLEX * QUICK_FACT_MULTIPLIER} ${FLEX * QUICK_FACT_MULTIPLIER} ${BASE_CARD_WIDTH * QUICK_FACT_MULTIPLIER}px;
    max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * QUICK_FACT_MULTIPLIER}px;
  `}
`;

export default StyledRCCard;

