const React = require('react')
const range = require('range')
const ReactFlex = require('react-flex')
require('react-flex/index.css')
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

import styled, { css } from 'styled-components';

class CardWrapper extends React.Component {
  render() {
    const { link, children, ...rest } = this.props
    if (link) {
      return <Link to={link} {...rest}>{children}</Link>
    } else {
      return <div {...rest}>{children}</div>
    }
  }
}

const BASE_CARD_WIDTH = 350;
const FLEX = 100;
const MAX_WIDTH_CONSTANT = 1.25;
const ARTICLE_MULTIPLIER = 1;
const INTERVIEW_MULTIPLIER = 1;
const CLIP_MULTIPLIER = 1;
const QUICK_FACT_MULTIPLIER = 1.5;
const FAQ_MULTIPLIER = .5;

const CardGridItem = styled.div`
  display: inline-block;
  height: auto;
  min-height: 200px;
  flex: ${FLEX} ${FLEX} ${BASE_CARD_WIDTH}px;
  margin-bottom: 30px;
  margin-left: 15px;
  margin-right: 15px;
  max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT}px;

  ${props => props.type == `Article` && css`
    flex: ${FLEX * ARTICLE_MULTIPLIER} ${FLEX * ARTICLE_MULTIPLIER} ${BASE_CARD_WIDTH * ARTICLE_MULTIPLIER}px;
    max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * ARTICLE_MULTIPLIER}px;
  `}

  ${props => props.type == `Interview` && css`
  flex: ${FLEX} ${FLEX * INTERVIEW_MULTIPLIER} ${BASE_CARD_WIDTH * INTERVIEW_MULTIPLIER}px;
  max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * INTERVIEW_MULTIPLIER}px;
  `}

  ${props => props.type == `Clip` && css`
  flex: ${FLEX * CLIP_MULTIPLIER} ${FLEX * CLIP_MULTIPLIER} ${BASE_CARD_WIDTH * CLIP_MULTIPLIER}px;
  max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * CLIP_MULTIPLIER}px;
  `}

  ${props => props.type == `QuickFact` && css`
    flex: ${FLEX * QUICK_FACT_MULTIPLIER} ${FLEX * QUICK_FACT_MULTIPLIER} ${BASE_CARD_WIDTH * QUICK_FACT_MULTIPLIER}px;
    max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * QUICK_FACT_MULTIPLIER}px;
  `}
 
  ${props => props.type == `FAQ` && css`
    flex: ${FLEX * QUICK_FACT_MULTIPLIER} ${FLEX * FAQ_MULTIPLIER} ${BASE_CARD_WIDTH * FAQ_MULTIPLIER}px;
    max-width: ${BASE_CARD_WIDTH * MAX_WIDTH_CONSTANT * FAQ_MULTIPLIER}px;
  `}
`

class Card extends React.Component {
    render() {
      const { link, className, style, children, ...rest } = this.props
      return (
        <CardGridItem {...rest}>
          <CardWrapper link={link} className={className} style={style}>
              {this.props.children}
          </CardWrapper>
        </CardGridItem>
      )
    }
}

const StyledCard = styled(Card)`
  display: block;
  height: 100%;
  background-color: white;
  border-radius:6px;
  overflow: hidden;
  -webkit-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  -moz-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  transition: all .3s;
  &:hover {
    -webkit-box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.908);
    -moz-box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.908);
    box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.908);
    // color:rgb(255, 132, 0);
    transition: all .3s;
    // transform: translateY(-1px);
  }
  
  font-family: "ff-tisa-web-pro";
  vertical-align: top;

  ${props => props.background && css`
    background-image: url('${props.background}');
    background-size: cover;
  `}

  ${props => props.link && css`
    color: inherit;
    text-decoration: inherit;
  `}
`;

export default StyledCard;

