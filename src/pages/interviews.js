import React from 'react'
import styled from 'styled-components'
import './interviews.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const InterviewTitle = styled.div`
  text-transform: uppercase;
`
const InterviewImage = styled.div`
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
`

const InterviewSummary = ({ data }) => {
  console.log(data)
  return (
      <div className={"interviewCard"}>
        <InterviewImage
        background={
          data.relationships.field_main_image &&
          data.relationships.field_main_image.localFile.publicURL
        }
        className={"interviewCardImage"}>
          {data.relationships.field_theme_image && data.relationships.field_theme_image.localFile.publicURL}
        </InterviewImage>
        <div className="interviewExcerpt">
          {data.field_medium_version && (
            <div
              dangerouslySetInnerHTML={{
                __html: data.field_medium_version.processed,
              }}
            />
            
          )}
          <InterviewTitle>
          <Link to={`/interviews/${kebabCase(data.title)}`}>{data.title}</Link>
           </InterviewTitle>
          <h1>{data.field_interviewee_name.processed}</h1>
          </div>
        {/* {data.relationships.field_belongs_to_subtheme ? (
        <ul>
          {data.relationships.field_belongs_to_subtheme.map(subTheme => (
            <InterviewSummary data={subTheme} />
          ))}
        </ul>
      ) : (
        <div>No subthemes</div>
      )} */}
      </div>
  )
}

export default ({ data }) => (
  <div className={"interviews"}>
    {data.allNodeInterview.edges.map((edge, i) => (
      <InterviewSummary data={edge.node} />
    ))}
  </div>
)

export const query = graphql`
  query InterviewsQuery {
    allNodeInterview {
        edges {
          node {
            title
            field_key_quote {
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
