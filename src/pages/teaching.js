import React from 'react'
import styled from 'styled-components'
import './FAQs.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import {
  getCards,
} from '../components/subtheme'

export default ({ data }) => {

  return (
    <div style={{margin:30}}>
      <h2>Lesson Plans</h2>
      {
        data.allNodeLessonPlan.edges.map(edge => (
          <div>
            <h3>{edge.node.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: edge.node.field_lesson_summary.processed }} />
          </div>
        ))
      }
      <h2>Articles</h2>
      {
        getCards({
          articles: data.allNodeArticle.edges.map(edge => edge.node),
        })
      }

      <h2>Interviews</h2>
      {
        getCards({
          interviews: data.allNodeInterview.edges.map(edge => edge.node),
        })
      }
   </div>
  )
}

export const query = graphql`
  query TeachingQuery {
    allNodeLessonPlan {
      edges {
        node {
          id
          title
          field_lesson_summary {
            value
            format
            processed
          }
        }
      }
    }
    allNodeArticle(filter: { field_include_in_the_teaching_se: { eq: true }}) {
      edges {
        node {
          ... ArticleFragment
        }
      }
    }
    allNodeInterview(filter: { field_include: { eq: true }}) {
      edges {
        node {
          ... InterviewFragment
        }
      }
    }
  }
`
