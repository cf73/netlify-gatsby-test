import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const GreyBackground = styled.div`
  background-color: #f7f7f7;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -999999;
  height: 100%;
  width:100%;
`
const IntroText = styled.div`
  font-weight: 300;
  font-size: 48px;
  line-height: 1.25;
  z-index:99999;
  padding: 60px 45px;
  margin-bottom: 60px;
  font-family: 'Lato';
  color: snow;
  background-color: #2b2b2b;
`
const InterviewCard = styled.div`
  background-color: #f5f6f9;
  padding: 30px;
  height: 100%;
  position: relative;
  border-radius: 6px;
  border: solid thin lightgrey;
  overflow:hidden;
  -webkit-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  -moz-box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  box-shadow: 0px 2px 15px 0px rgba(179,179,179,0.38);
  transition: all .3s;
  &:hover {
    -webkit-box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.78);
    -moz-box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.78);
    box-shadow: 0px 7px 15px 2px rgba(179,179,179,0.78);
    transition: all .3s;
  }
`
const InterviewTitle = styled.div`
  margin-bottom: 30px;
  font-size:30px;
  line-height:1.25;
  z-index:99999;
  line-height:1;
  color: inherit;
`
const InterviewExcerpt = styled.div`
  line-height: 1.5;
  font-weight: 500;
  opacity: 0.9;
  font-style: italic;
  font-size: 24px;
`
const InterviewImage = styled.div`
  background-color:red;
  display: inline-block;
  width:33%;
  position: absolute;
  height: 100%;
  top:0;
  left: 0;
  background-position: center;
  background-size:cover;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
`
const InterviewMain = styled.div`
  margin-left: calc(33% + 30px);
  margin-bottom: 180px;
`
const AllInterviews = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 45px;
`
const AuthorBioText = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  left:0;
  z-index: 9999999999;
  background-color: rgba(255, 255, 255, 0.96);
  padding: 30px;
  font-size: 14px;
  line-height: 1.5;
  font-weight:500;
  border-top: solid thin lightgrey;
  font-family: 'Lato';
`
const AuthorBio = ({ data }) => (
  <div
  dangerouslySetInnerHTML={{
    __html: data.field_interviewee_bio && data.field_interviewee_bio.processed,
  }}
  />
)

const InterviewSummary = ({ data }) => {
  return (
    <Link style={{
      flexGrow: 0,
      flexShrink: 1,
      marginBottom: 60,
      flexBasis: 'calc(50% - 30px)',
      textDecoration: 'none',
      color: 'inherit'
    }} to={`/interviews/${kebabCase(data.title)}`}>
      <InterviewCard>
        <InterviewImage background={
          data.relationships.field_interviewee &&
          data.relationships.field_interviewee.localFile.publicURL
        } />
        <InterviewMain>   
             <InterviewTitle><h4 style={{marginBottom:7.5}}>Interview with</h4>{data.field_interviewee_name.processed}</InterviewTitle>
             <InterviewExcerpt 
              dangerouslySetInnerHTML={{
                    __html: data.field_interview_summary && data.field_interview_summary.processed,
              }} />
             <AuthorBioText>
                <AuthorBio data={data}> </AuthorBio>
             </AuthorBioText>
          {/* {data.relationships.field_belongs_to_subtheme ? (
          <ul>
            {data.relationships.field_belongs_to_subtheme.map(subTheme => (
              <InterviewSummary data={subTheme} />
            ))}
          </ul>
        ) : (
          <div>No subthemes</div>
        )} */}
        </InterviewMain>
      </InterviewCard>
    </Link>
  )
}

export default ({ data }) => (
  <div>
    <IntroText dangerouslySetInnerHTML={{
                  __html: data.taxonomyTermInterviewsPage.description && data.taxonomyTermInterviewsPage.description.processed,
                }} />
    <div className={"interviews"}>
    <GreyBackground />
  
      <AllInterviews>
        {data.allNodeInterview.edges.map((edge, i) => (
          <InterviewSummary data={edge.node} />
        ))}
      </AllInterviews>
    </div>
  </div>
)

export const query = graphql`
  query InterviewsQuery {
    taxonomyTermInterviewsPage {
      id
      description {
        processed
      }
    }
    allNodeInterview {
        edges {
          node {
            title
            field_key_quote {
              processed
            }
            field_interview_summary {
              processed
            }
            field_interviewee_name {
              processed
            }
            field_interviewee_bio {
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
      }
  }
`
