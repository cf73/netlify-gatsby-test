const React = require('react')
import styled from 'styled-components'
import { Overlay, OverlayHeader, OverlayTitle, OverlayFilter, OverlayBody }  from '../components/overlay'
const queryString = require('query-string');
import kebabCase from 'lodash/kebabCase'
import Link, { navigateTo } from 'gatsby-link';

class SingleFAQ extends React.Component {
  render() {
    return (
    	<div>
	      <p style={{maxWidth:700, margin:'0 auto'}} dangerouslySetInnerHTML={{
					__html: this.props.data.nodeFaq.field_question_summary 
							? this.props.data.nodeFaq.field_question_summary.processed
							: `no summary (just so this doesn't cause build errors), title: ${this.props.data.nodeFaq.title}`,
	            }}
	      />

        </div>
    )
  }
}

export default SingleFAQ

export const interviewsQuery = graphql`
  query faqQuery($id: String) {
    nodeFaq(id: { eq: $id }) {
	  id
		title
	  field_title {
	    processed
	  }
	  field_question_summary {
	    processed
	  }
	  field_expert_1 {
	    processed
	  }
	  field_expert_1_answer {
	    processed
	  }
	  field_expert_2 {
	    processed
	  }
	  field_expert_3_name {
	    processed
	  }
	  field_expert_4_name {
	    processed
	  }
	  field_expert_4_answer {
	    processed
	  }
    }
  }
`
