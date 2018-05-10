import React from 'react'
import styled from 'styled-components'
import './FAQs.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const FAQTitle = styled.div`
    
`

const FAQSummary = ({ data }) => {
  console.log(data)
  return (
      <div className={"articleCard"}>
       
        <div className="articleExcerpt">
          {data.field_medium_version && (
            <div
              dangerouslySetInnerHTML={{
                __html: data.field_medium_version.processed,
              }}
            />
          )}
          
          <FAQTitle>
            <Link to={`/articles/${kebabCase(data.title)}`}>{data.title}</Link>
          </FAQTitle>
          
        </div>
       
      </div>
  )
}

export default ({ data }) => (
  <div className={"articles"}>
    {data.allNodeFaq.edges.map((edge, i) => (
      <FAQSummary data={edge.node} />
    ))}
  </div>
)

export const query = graphql`
  query FAQssQuery {
    allNodeFaq {
        edges {
          node {
            title
          }
        }
      }
  }
`
