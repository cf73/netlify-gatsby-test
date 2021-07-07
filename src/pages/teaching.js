import React from 'react'
import styled from 'styled-components'
import './FAQs.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import {
  getCards,
} from '../components/subtheme'

const IntroText = styled.div`
  font-weight: 300;
  font-size: 48px;
  line-height: 1.25;
  z-index:99999;
  margin: 60px 45px;
  font-family: 'Lato';
`

export default ({ data }) => {

  return (
    <div>
    <IntroText>
      Teach topics from the film with specially curated lesson plans, handouts, articles, and interviews.
    </IntroText>

        <h2>Lesson Plans</h2>
      <div className="row" style={{padding: '0 30px'}}>
      {
        data.allNodeLessonPlan.edges.map(edge => (
          <div className="articleCard" style={{padding:30}}>
            <h2>{edge.node.title}</h2>
            <div>
              <h4 style={{marginBottom:15}}>Subjects:</h4>
              <p dangerouslySetInnerHTML={{ __html: edge.node.field_subjects && edge.node.field_subjects.processed }} />
            </div>
            <div>
              <h4 style={{marginBottom:15}}>Grade Levels:</h4>
              <p dangerouslySetInnerHTML={{ __html: edge.node.field_grade_levels && edge.node.field_grade_levels.processed }} />
            </div>
            <div>
              <h4 style={{marginBottom:15}}>Overview:</h4>
              <p dangerouslySetInnerHTML={{ __html: edge.node.field_lesson_summary && edge.node.field_lesson_summary.processed }} />
            </div>
            <div>
              <h4 style={{marginBottom:15}}>Objectives:</h4>
              <p dangerouslySetInnerHTML={{ __html: edge.node.field_objectives && edge.node.field_objectives.processed }} />
            </div>
            <button>
              View lesson plan
            </button>
          </div>
        ))
      }
      </div>
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
          field_activity{
            processed
          }
          field_overview {
            processed
          }
          field_subjects {
            processed
          }
          field_objectives {
            processed
          }
          field_copyright_a {
            processed
          }
          field_description {
            processed
          }
          field_lesson_plan {
            processed
          }
          field_grade_levels {
            processed
          }
          field_lesson_summary {
            processed
          }
          field_time_allotment {
            processed
          }
          field_lesson_plan_author {
            processed
          }
          field_less_plan_author_bio {
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
