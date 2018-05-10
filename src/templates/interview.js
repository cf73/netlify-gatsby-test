const React = require('react')
import styled from 'styled-components'
import { getCards } from '../components/subtheme'

const KeyQuote = styled.div`
  font-size: 28px;
  font-weight: normal;
`
const InterviewHeader = styled.div`
  width: 100%;
  height: 66vh;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: lightgrey;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -999;
`

const InterviewMain = styled.div`
  background-color: white;
  padding: 30px;
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

const AuthorBio = ({ data }) => (
  <div style={{marginTop: 20}}>{data.nodeInterview.field_interviewee_bio.processed}</div>
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
        <InterviewHeader

        />
          <div className="column _25" />
          <InterviewMain className="column _60">
            <img src={
                data.nodeInterview.relationships.field_interviewee &&
                data.nodeInterview.relationships.field_interviewee.localFile.publicURL
              } />
            <div
              dangerouslySetInnerHTML={{
                __html: data.nodeInterview.field_full_length_version.processed,
              }}
            />
          </InterviewMain>
          <div className="column">
          <AuthorBio data={data}> </AuthorBio>
          <KeyQuote style={{lineHeight:1.5, fontStyle:'italic'}}
              dangerouslySetInnerHTML={{
                __html: data.nodeInterview.field_key_quote.processed,
              }}
            />
              <strong>{data.nodeInterview.title}</strong>
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
          </div>
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
