import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const ClipCard = styled.div`
	width: 300px;
	background-color:#292929;
	color: white;
	display:inline-block;
	vertical-align: top;
	margin-right:30px;
	margin-bottom: 30px;
	transition: all .3s;
	border-radius: 6px;
	&:hover {
	  transition: all .3s;
	}
	cursor: pointer;
`
const ClipCaption = styled.div`
	font-family: 'Lato';
	font-size: 14px;
	line-height: 1.5;
	font-weight: 300;
	letter-spacing: 0.04em;
	padding: 15px 30px 30px 30px;
`
const ClipPoster = styled.div`
	height:200px;
	width:100%;
	background-color:red;
	background-size:cover;
	background-position: center;
    background-image: ${props => props.background ?  `url(${props.background})` : `none`};
`

export const Clip = ({ clip, link }) =>  {
	return (
			<ClipCard>
				{
					link ?
						<Link style={{color:'inherit', textDecoration:'none'}} to={`/clips/${kebabCase(clip.title)}`}>
							<ClipPoster background={clip.relationships.field_poster_image && clip.relationships.field_poster_image.localFile.publicURL} />
							<ClipCaption>
								{clip.title}
							</ClipCaption>
						</Link> :
						
							<iframe src={`${clip.field_external_video_url && clip.field_external_video_url.uri}?title=0&byline=0&portrait=0`} frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
							
						
				}
				
			</ClipCard>
		)
}


const AllClips = ({ data }) => (
  <div style={{padding: '0 30px'}}>
    {data.allNodeClip.edges.map((edge, i) => (
      <Clip clip={edge.node} link={true} />
    ))}
  </div>
)

export default AllClips

