import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'
import AllClips from '../components/allClips.js'


const ClipsIntro = styled.div
`
	font-size:24px;
	margin-bottom:60px;
	line-height:1.5;
`

export default ({ data }) => (
	<div className='darkwrapper'>
		<ClipsIntro>
			Various clips from the film featured here. Buy a copy of the film here.
		</ClipsIntro>
		<AllClips data={data} />
	</div>
)

export const query = graphql`
  query ClipsQuery {
    allNodeClip {
		  edges {
		    node {
		      field_episode
		      title
		    	field_title_of_clip {
		        processed
		      }
		       relationships {
		        field_poster_image {
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

