const React = require('react')
import styled from 'styled-components'
import { getCards } from '../components/subtheme'

const KeyQuote = styled.div`
  font-size: 60px;
  font-weight: 500;
  margin-bottom: 60px;
  padding: 192px 120px 108px 120px;
  width: 100%;
  line-height:1.25;
  // font-style: italic;
  text-align: center;
  border-bottom: solid thin lightgrey;
  font-family: "orpheuspro";
  background-color:#2b2b2b;
  color: snow;
`
const AuthorBioText = styled.div`
  width: 300px;
  height: auto;
  position: absolute;
  top: 860px;
  left: 60px;
  z-index: 9999999999;
  background-color: white;
  padding: 30px;
  font-size: 12px;
  line-height: 1.5;
  font-weight:500;
  opacity:0.9;
`
const InterviewTitle = styled.div`
  margin-bottom: 45px;
  font-size:60px;
  font-weight: 500;
  line-height:1.25;
  position: relative;
  z-index:99999;
  line-height:1;
  font-family: "orpheuspro";

`
const InterviewMain = styled.div`
  padding: 30px;
  margin-left:72.5%;
  position: relative;
`

const Overlay = styled.div`
  background-color: #FFFFE0;
  position: fixed;
  opacity: 0.8;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%
`

const Centered = styled.div`
  border: 1px solid #888888;
  opacity: 1;
  position: relative;
  top: 50%;
  width: 50%;
  padding: 20px;
  transform: translate(50%, -50%);
`
const AuthorImage = styled.div`
  position: absolute;
  top:440px;
  left:-440px;
  height: 420px;
  width: 420px;
  border-radius: 50%;
  right:calc(55% - 200px);
  background-size: cover;
  background-position: center;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
  overflow:hidden;
`
const TopText = styled.div`
  width: calc(100% - 200px);
  // text-align: center;
  padding: 30px 45px;
  top:0;
  position: fixed;
  background-color: rgba(255,255,255,0.92);
  border-bottom: solid thin lightgrey;
  z-index: 999999999;
`

const AuthorBio = ({ data }) => (
  <div style={{fontFamily: 'Lato'}}>{data.nodeInterview.field_interviewee_bio.processed}</div>
)

class QuickFactOverlay extends React.Component {
  render() {
    const { quickFact } = this.props

    if (!quickFact) { return null; }

    const quickClips = quickFact.relationships.field_related_content || [];

    const quickClipLinks = {
      articles: [],
      clips: [],
      faqs: [],
      quickFacts: []
    }

    quickClips.forEach(item => {
      if (item.__typename == `node__faq`) {
        quickClipLinks.faqs.push(item)
      } else if (item.__typename == `node__article`) {
        quickClipLinks.articles.push(item)
      } else if (item.__typename == `node__clip`) {
        quickClipLinks.clips.push(item)
      }
    })

    return (
      <Overlay>
        <Centered>
          <div onClick={this.props.closeHandler} style={{float: `right`, color: `red`}}>
            <b>Close</b>
          </div>
          <h3>{quickFact.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: quickFact.field_quickfact.processed,
            }}
          />
          {
            getCards(quickClipLinks).slice(0,2)
          }
        </Centered>
      </Overlay>
    )
  }
}

class SingleInterview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { data } = this.props

    return (
      <div className="row">
        <QuickFactOverlay
          quickFact={this.state.quickFact}
          closeHandler={() => this.setState({ quickFact: null })}
        />
        <TopText>
        {/* <img style={{width: 30, transform:'rotate(90deg)'}} src={require('../assets/images/down2.svg')} /> */}
          {/* <h4 style={{marginBottom:0}}>Interview with {data.nodeInterview.field_interviewee_name.processed}</h4> */}
          <img style={{height: 24, opacity:0.8, display:'inline-block', marginBottom:0, marginRight:15, verticalAlign:'middle'}} src={require('../assets/images/back.svg')} />
          <h4 style={{marginBottom:0, display:'inline-block', verticalAlign:'middle'}}>all interviews</h4>
        </TopText>
        <AuthorBioText>
          <AuthorBio data={data}> </AuthorBio>
        </AuthorBioText>
        <KeyQuote
              dangerouslySetInnerHTML={{
                __html: data.nodeInterview.field_key_quote.processed,
              }}
            />
          <InterviewMain style={{maxWidth:580}} className="column">
         

          <InterviewTitle><h4 style={{marginBottom:15}}>Interview with</h4>{data.nodeInterview.field_interviewee_name.processed}</InterviewTitle>
          <AuthorImage background={data.nodeInterview.relationships.field_interviewee && data.nodeInterview.relationships.field_interviewee.localFile.publicURL} />
            <div
              dangerouslySetInnerHTML={{
                __html: data.nodeInterview.field_full_length_version.processed,
              }}
            />
              <div style={{height: 200}}/>
              {
                (data.nodeInterview.relationships.backref_field_related_content || []).map(quickFact => (
                    <div style={{ cursor: `pointer`, border: `1px solid #888888`, padding: 20}}>
                      <h3>{quickFact.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: quickFact.field_quickfact.processed,
                        }}
                        onClick={() => this.setState({ quickFact: quickFact })}
                      />
                    </div>
                  )
                )
              }
          </InterviewMain>
          <div className="column _25" />
      </div>
    )
  }
}

export default SingleInterview

export const interviewsQuery = graphql`
  query interviewQuery($id: String) {
    nodeInterview(id: { eq: $id }) {
        title
        field_interviewee_name {
            processed
        }
        field_interviewee_bio {
            processed
        }
        field_key_quote {
            processed
        }
        field_full_length_version {
            processed
        }
        relationships {
            field_interviewee {
            localFile {
                publicURL
            }
            }
        }
    }
  }
`
