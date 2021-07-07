const React = require('react')
const range = require('range')
const ReactFlex = require('react-flex')
require('react-flex/index.css')
import Img from 'gatsby-image'
const FlipMove = require('react-flip-move');
import styled from 'styled-components';
import Link, { navigateTo } from 'gatsby-link';
import Card from './card.js';
import RCCard from './rccard.js';
const queryString = require('query-string');
import './subtheme.css';
import kebabCase from 'lodash/kebabCase'

const Video = styled.video`
  width: 100%;
  display: block;
`
const FAQQuestion = styled.div`
  background-color:rgba(255,255,255,0.82);
  height:auto;
  padding:30px;
  margin:0 auto;
`
const SubthemeTitle = styled.div`
  font-weight: normal;
  text-rendering: optimizeLegibility;
  font-size: 42px;
  font-weight:300;
  // text-transform: uppercase;
  padding: 15px;
  font-family: 'Lato';
  text-align: center;
  color: rgba(59, 59, 59, 0.8);
  margin-bottom: 15px;
  margin-top: 15px;
  // letter-spacing: 0.04em;
`
const NUM_CARDS_TO_SHOW = 3;

const defaultToEmpty = arr => (arr ? arr : [])

const shuffle = (arr) => {
  var currentIndex = arr.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}
 
const reorder = (arr, order) => {
  const newArr = new Array(arr.length);
  order.forEach((item, i) => {
    newArr[i] = arr[item];
  })
  return newArr;
}

const ArticleTitle = styled.div`
  font-family: 'Lato';
  font-size:30px;
  font-weight: 700;
  color: black;
  padding: 0px 30px 0 0px;
  line-height:1.25;
  margin-bottom: 15px;
`

class PlayablePoster extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    if (!this.props.clip.relationships.field_poster_image) {
      return (
        <div className={'poster'}/>
      );
    }

    if (this.state.play) {
      return (
        /*
        <Video controls>
          <source
            src={this.props.clip.field_external_video_url.uri}
          />
        </Video>
        */
        <div className={'poster'}>
          <iframe src="https://player.vimeo.com/video/18769983?title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
      )
    }

    if (this.props.linkable) {
      return (
        <Link to={`../clips/${kebabCase(this.props.clip.title)}`}>
          <div className={'poster'}>
            <img src={this.props.clip.relationships.field_poster_image.localFile.publicURL} />
          </div>
        </Link>
      )
    }
    return (
      <div className={'poster'} onClick={() => this.setState({ play: true })}>
        <img src={this.props.clip.relationships.field_poster_image.localFile.publicURL} />
      </div>
    );
  }
}

export class ArticleCard extends React.Component {
  render() {
    const { article, i, relatedContent, style = {} } = this.props 
    return (
      relatedContent ?
        <RCCard style={{...style, padding:30}} key={`article-${i}`} article={article} imgSrc={article.relationships.field_main_image && article.relationships.field_main_image.localFile && article.relationships.field_main_image.localFile.publicURL } title={article.title} type="Article" slug="article" changed={article.changed}>
        {article.field_short_version && (
          <p className={'RCcard-large-text'} dangerouslySetInnerHTML={{ __html: article.field_short_version.processed }} />
        )}
        </RCCard> :
        <Card style={{...style, padding:0}} key={`article-${i}`} title={article.title} type="Article" slug="article" changed={article.changed} link={`/articles/${kebabCase(article.title)}`}>
        <div className='articleCardImage' style={{ backgroundImage: article.relationships.field_main_image ? `url(${article.relationships.field_main_image.localFile.publicURL})` : null}}/>
        {article.field_short_version && (
          <div style={{padding: 30}}>
            <h4 style={{marginBottom:15}}>Article by {article.field_author && article.field_author.processed}</h4>
            {/* { article.field_author && <h6 style={{textAlign:'right', marginBottom:7.5, fontSize:14}} dangerouslySetInnerHTML={{ __html: article.field_author.processed}}/>} */}
            <ArticleTitle>{article.title}</ArticleTitle>
            "<span className={'card-large-text'} dangerouslySetInnerHTML={{ __html: article.field_short_version.processed }} />
             
            
           
          </div>
        )}
        </Card>
    )
  }
}

export class ClipCard extends React.Component {
  render() {
    const { clip = { relationships: {} }, i, relatedContent, linkable, style = {} } = this.props
    return (
      relatedContent ?
      <RCCard key={`clip-${i}`} title={clip.title} slug="clip" changed={clip.changed} style={style}>
        <PlayablePoster
          clip={clip}
          linkable={linkable}
        />
        <p style={{paddingLeft:30, paddingRight:30, paddingBottom: 20}} className={'caption'}>{clip.title}</p>
      </RCCard> :
      // background={clip.relationships.field_poster_image && clip.relationships.field_poster_image.localFile.publicURL}
      <Card key={`clip-${i}`} title={clip.title} type="Clip" slug="clip" style={style} changed={clip.changed} link={`/clips/${kebabCase(clip.title)}`}>
        <PlayablePoster
          clip={clip}
        />
        <p style={{paddingLeft:30, paddingRight:30, paddingBottom: 20}} className={'caption'}>{clip.title}</p>
      </Card>
    )
  }
}

export class FAQCard extends React.Component {
  render() {
    const { faq = {}, i, relatedContent, style = {} } = this.props
    return (
      <Card style={{...style, padding:30, display:'flex', flexDirection: 'column', justifyContent:'center'}} key={`faq-${i}`}  slug="faq" changed={faq.changed} type="FAQ" link={`/faqs/${kebabCase(faq.title)}`}>
        <h4 style={{marginBottom:15}}>Q&A</h4>
        <p className='card-large-text'>{faq.title}</p>
      </Card>
    )
  }
}

export class InterviewCard extends React.Component {
  render() {
    const { interview = {}, i, relatedContent, style = {} } = this.props
    return (
      <Card style={{...style, padding:30, display:'flex', flexDirection: 'column', justifyContent:'center'}} key={`interview-${i}`} type="Interview" title={interview.title} slug="interview" changed={interview.changed} link={`/interviews/${kebabCase(interview.title)}`}>
        <div className="interviewCardPhoto" style={{backgroundImage: interview.relationships.field_interviewee ? `url(${interview.relationships.field_interviewee.localFile.publicURL})` : null }}/>
        {/* <h4 style={{marginBottom:15}}>Interview with </h4> */}
        <h4 style={{marginTop:15, marginBottom:15, lineHeight:1.5, textAlign:'center'}}>{interview.title}</h4>
        <p style={{fontStyle:'italic', textAlign:'center'}} className={'card-large-text'}>{interview.field_key_quote.processed}</p>
      </Card>
    )
  }
}

export class QuickFactCard extends React.Component {
  render() {
    const { quickfact, i, relatedContent, style = {}, ...rest } = this.props
    return (
      <Card {...rest} key={`quickfact-${i}`} type="QuickFact" title={quickfact.title} slug="quickfact" changed={quickfact.changed} style={{ ...style, padding:15}}>
        <h4>{quickfact.title}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: quickfact.field_quickfact.processed,
          }}
        />
      </Card>
    )
  }
}

export const getCards = (relationships, queryFilter, relatedContent, linkableClip) => [
  ...defaultToEmpty(relationships.articles).filter(article => !queryFilter || queryFilter == `recent` || queryFilter == `article`).map((article, i) => (<ArticleCard key={`article-${article.title}`} article={article} i={i} relatedContent={relatedContent} />)),
  ...defaultToEmpty(relationships.clips).filter(clip => !queryFilter || queryFilter == `recent` || queryFilter == `clip`).map((clip, i) => (<ClipCard key={`clip-${clip.title}`} linkable={linkableClip} clip={clip} i={i} relatedContent={relatedContent} />)),
  ...defaultToEmpty(relationships.faqs).filter(faq => !queryFilter || queryFilter == `recent` || queryFilter == `faq`).map((faq, i) => (<FAQCard key={`faq-${faq.title}`} faq={faq} i={i} relatedContent={relatedContent} />)),
  ...defaultToEmpty(relationships.interviews).filter(interview => !queryFilter || queryFilter == `recent` || queryFilter == `interview`).map((interview, i) => (<InterviewCard key={`interview-${interview.title}`} interview={interview} i={i} relatedContent={relatedContent} />)),
  ...defaultToEmpty(relationships.quickfacts).filter(quickfact => !queryFilter || queryFilter == `recent` || queryFilter == `quickfact`).map((quickfact, i) => (<QuickFactCard key={`quickfact-${quickfact.title}`} quickfact={quickfact} i={i} relatedContent={relatedContent} />)),
]

const DISPLAY_NAMES_TO_SLUG = new Map([
  [`articles`, `article`],
  [`interviews`, `interview`],
  [`faqs`, `faq`],
  [`clips`, `clip`],
  [`recently added`, `recent`]
])

const itemExists = (itemTag, parent) => {
  // console.log(parent.relationships)
  // console.log(itemTag)
  return parent.relationships[itemTag]

}

const FilterButtonStyle = {
  color: `rgb(255, 132, 0)`,
  marginRight: 15,
  marginBottom: 15,
  fontSize:14,
  letterSpacing:'0.125em',
}

const FilterButtonStyleActive = {
  ...FilterButtonStyle,
  fontWeight: `700`,
  borderBottom: `solid 2px hotpink`,
}

const Filters = ({ queryParams, name, filter, subtheme, toggleFilter }) => (
  <div style={{
    mixBlendMode:'normal',
    textAlign: 'center',
    marginBottom: 15
  }}
    >
    <span style={{
            marginRight: 15,
            fontFamily: 'Lato',
            fontWeight:700,
            fontSize: 14,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:'hotpink'
          }}
          >Sort by: </span>
          <button onClick={() => {
            toggleFilter(null)
            // const newQueryParams = { ... queryParams }
            // delete newQueryParams[name]
            // navigateTo(`?${queryString.stringify(newQueryParams)}`)
          }}
          style={
            (!filter ? FilterButtonStyleActive : FilterButtonStyle)
          }>
            All
          </button>
    {
      Array.from(DISPLAY_NAMES_TO_SLUG.keys()).filter(itemType => (itemType === `recently added` || itemExists(itemType, subtheme))).map(filterType => {
        const filterSlug = DISPLAY_NAMES_TO_SLUG.get(filterType)

        return (
          <button
            key={filterType}
            onClick={() => {
              toggleFilter(filterSlug)
              // const newQueryParams = { ... queryParams }
              // if (newQueryParams[name] == filterSlug){
              //   delete newQueryParams[name]
              // } else {
              //   newQueryParams[name] = filterSlug;
              // }
              // navigateTo(`?${queryString.stringify(newQueryParams)}`)
            }}
            style={{
              ...(filter == filterSlug ? FilterButtonStyleActive : FilterButtonStyle),
              float: (
                (filterSlug === `recent`) ?
                `none` : `none`
              ),
              fontWeight:700, letterSpacing:'0.2em', color:'hotpink'
            }}
          >
            {filterType}
          </button>
      )})
    }
  </div>
)


class SubthemeSection extends React.Component {
  constructor(props){
    console.log('creating subsection')
    super(props)

    this.updateOrder(props, null)
    this.state = { 
      numCards: NUM_CARDS_TO_SHOW,
      filter: null, 
    }
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  toggleFilter(value) {
    if (this.state.filter === value) {
      this.setState({filter: null})
    } else {
      this.setState({filter: value})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      // nextProps.filter !== this.props.filter ||
      nextState.numCards !== this.state.numCards ||
      nextState.filter !== this.state.filter
    );
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.filter !== nextState.filter) {
      this.updateOrder(nextProps, nextState.filter)
    }
  }
  updateOrder(props, filter) {
    if (props.filter) return;
    const length = getCards(props.data.relationships, filter).length;
    this.order = shuffle(range.range(length))
  }
  render() {
    const subtheme = this.props.data
    console.log(this.state)
    const { Flex, Item } = ReactFlex

    // TODO (Conrad): Create custom card component for each type of data (article, clip, faq, etc)

    const { filter } = this.state;

    const allCards = filter ?
      getCards(subtheme.relationships, filter, null, true).sort((a, b) => (b.props.changed - a.props.changed)) :
      reorder(getCards(subtheme.relationships, filter, null, true), this.order)
      // getCards(subtheme.relationships, filter, null, true)

    const description = subtheme.description
      ? <div
            className={'subtheme-description'}
            key="description"
            dangerouslySetInnerHTML={{ __html: subtheme.description.processed }}
          />
      : null

    return (
      <div className={this.props.className}>

        <SubthemeTitle>{subtheme.name}</SubthemeTitle>
         { description }

        <Filters
          // queryParams={this.props.queryParams}
          // filters={this.state.filters}
          // value={this.state.filters[filter]}
          toggleFilter={this.toggleFilter}
          name={this.props.name}
          filter={filter}
          subtheme={subtheme}
        />
        <FlipMove style={{ display: 'flex', 'flexWrap': 'wrap', justifyContent: 'center' }} >
          {
            allCards.slice(0, this.state.numCards)
          }
        </FlipMove>
        {
          allCards.length >= this.state.numCards ?
           <div style={{width:'100%', textAlign:'center'}}>
              <button style={{ margin: '30px auto', color:'rgba(59, 59, 59, 0.8)' }} onClick={() => { this.setState({ numCards: this.state.numCards + NUM_CARDS_TO_SHOW }); } }>
                Show More <i className="fa fa-angle-down"></i>
              </button>
           </div> :
            null
        }


      </div>
    )
  }
}


const SubthemeContainer = styled(SubthemeSection)`
  background-color: rgba(247, 247, 247, 0.97);
  padding: 45px 30px;
  border-bottom: solid thin grey;
  margin: 60px 30px;

`

export default SubthemeContainer;

