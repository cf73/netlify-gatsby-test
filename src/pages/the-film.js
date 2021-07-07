import React from 'react'
import styled from 'styled-components'
import './FAQs.css'
import Link, {navigateTo} from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import { Overlay, OverlayHeader, OverlayBody }  from '../components/overlay'
const queryString = require('query-string');

import episodes from '../utils/episodes-data'

const HeaderDimmer = styled.div`
  width: 100%;
  position: absolute;
  left:0;
  right:0;
  top:0;
  z-index: -1;
  height:50vh;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,d3dde5+100&0.5+1,0+100 */
  background: -moz-linear-gradient(top, rgba(0,0,0,0.5) 0%, rgba(2,2,2,0.5) 1%, rgba(211,221,229,0) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(0,0,0,0.5) 0%,rgba(2,2,2,0.5) 1%,rgba(211,221,229,0) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(2,2,2,0.5) 1%,rgba(211,221,229,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80000000', endColorstr='#00d3dde5',GradientType=0 ); /* IE6-9 */
`

const Wrapper = styled.div`
  margin: 250px auto 0px;
  max-width: 100%;
`

class ExpandableText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
        this.toggleExpand = this.toggleExpand.bind(this)
    }

    toggleExpand() {
        this.setState({expanded: !this.state.expanded})
    }

    render() {
        const { expanded } = this.state
        return (
            <div>
                <div style={{maxHeight: expanded ? '' : '105px', overflow: 'hidden', marginBottom: 15 }}>
                    {this.props.children}
                </div>
                <button className="tag" style={{float: 'right'}} onClick={this.toggleExpand}>{expanded ? "View less" : "View more"}</button>
            </div>
        )
    }
}

const EpisodeItem = ({ episode, queryParams }) => (
    <div className="row" style={{marginBottom: 25}}>
        <div className="column">
            <div style={{background: 'gray', width: 500, height: (500 * 9 / 16)}}/>
        </div>
        <div className="column">
            Episode {episode.episodeNumber}
            <h2>{episode.title}</h2>
            <div style={{margin: '0 -15px'}}>
                <Link to={`?${queryString.stringify({ ...queryParams, transcript: episode.episodeNumber })}`} className="tag">Transcript</Link>
                <Link to={`?${queryString.stringify({ ...queryParams, credits: episode.episodeNumber })}`} className="tag">Credits</Link>
                <button className="tag">Clips</button>
            </div>
            <div>
                <ExpandableText>
                    <div dangerouslySetInnerHTML={{
                        __html: episode.description,
                    }}/>
                </ExpandableText>
            </div>
        </div>
    </div>
)

const getEpisodeByNumber = episodeNumber => episodes.find(episode => episode.episodeNumber === episodeNumber)
const safeGet = (object, fieldName) => object ? object[fieldName] : null

const closeHandler = () => {
  navigateTo(`?`)
}

export default ({ data, transition, location }) => {
  const queryParams = queryString.parse(location.search)

  const transcript = queryParams.transcript ? getEpisodeByNumber(queryParams.transcript) : null
  const credits = queryParams.credits ? getEpisodeByNumber(queryParams.credits) : null

  return (
    <Wrapper>
        <HeaderDimmer />
        <Overlay id="film-overlay" visible={!!transcript || !!credits} style={transition && transition.style}>
        {(transcript || credits) &&
            <OverlayBody>
                <OverlayHeader>
                    <div onClick={closeHandler} style={{float: `right`, color: `red`, cursor: `pointer`}}>
                    <b>Close</b>
                    </div>
                    <div style={{
                    textAlign:'center'
                    }}>
                        <h1>{transcript ? transcript.title : credits.title}</h1>
                    </div>
                </OverlayHeader>
                <div
                dangerouslySetInnerHTML={{
                    __html: transcript ? safeGet(transcript, 'transcript') : safeGet(credits, 'credits'),
                }}
                />
            </OverlayBody>
        }
        </Overlay>
        <div className="row">
            <div className="column _25"/>
            <div className="column">
                <h1>Race: The Power of an Illusion</h1>
                <p><strong>Statement from executive producer</strong></p>
                <div className="row" style={{margin: '0 -15px'}}>
                    <div className="column">
                        <p>Race is one topic where we all think we're experts. Yet ask 10 people to define race or name "the races," and you're likely to get 10 different answers. Few issues are characterized by more contradictory assumptions and myths, each voiced with absolute certainty.</p>

                        <p>In producing this series, we felt it was important to go back to first principles and ask, What is this thing called "race?" - a question so basic it is rarely raised. What we discovered is that most of our common assumptions about race - for instance, that the world's people can be divided biologically along racial lines - are wrong. Yet the consequences of racism are very real.</p>

                        <p>How do we make sense of these two seeming contradictions? Our hope is that this series can help us all navigate through our myths and misconceptions, and scrutinize some of the assumptions we take for granted. In that sense, the real subject of the film is not so much race but the viewer, or more precisely, the notions about race we all hold.</p>

                        <p>We hope this series can help clear away the biological underbrush and leave starkly visible the underlying social, economic, and political conditions that disproportionately channel advantages and opportunities to white people. Perhaps then we can shift the conversation from discussing diversity and respecting cultural difference to building a more just and equitable society.</p>

                        <p><strong>April 2003</strong></p>
                    </div>
                    <div>
                        <div className="tag">Buy on DVD</div>
                        <br/>
                        <div className="tag">Stream on demand</div>
                        <br/>
                        <div className="tag">Contact</div>
                    </div>
                </div>
                <div style={{marginTop: 50}}>
                    {episodes.map(episode => <EpisodeItem key={`episode-${episode.episodeNumber}`} episode={episode} queryParams={queryParams} />)}
                </div>
            </div>
            <div className="column _25"/>
        </div>
    </Wrapper>
  )
}

// export const query = graphql`
//   query FAQssQuery {
//     allNodeFaq {
//         edges {
//           node {
//             title
//           }
//         }
//       }
//   }
// `
