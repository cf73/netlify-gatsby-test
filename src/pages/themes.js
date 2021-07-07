import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const HomeThemeImage = styled.div`
  height: 400px;
  color: white;
  font-family: 'Lato';
  font-size:24px;
  line-height:1.5;
  text-align: center;
  letter-spacing: 0.04em;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 120%;
  transition: all .5s;
  &:hover {
    background-size:125%;
    transition: all .5s;
  }
  background-image: ${props =>
                      props.background ? `url(${props.background})` : `none`};
`

const IntroText = styled.div`
  font-weight: 300;
  font-size: 48px;
  line-height: 1.25;
  z-index:99999;
  margin: 60px 45px;
  font-family: 'Lato';
`

const ThemeComponent = ({ data }) => (
    <div style={{
      width: '30%',
      height: 'auto',
      margin: 15,
      borderRadius: 0,
      overflow: 'hidden',
      display:'inline-block'
      }}
    >
      <Link style={{textDecoration:'none', color:'inherit'}} to={`/themes/${kebabCase(data.name)}`}>
        <HomeThemeImage background={data.relationships.field_theme_image && data.relationships.field_theme_image.localFile.publicURL} />
        <h4>{data.name}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: data.description && data.description.processed,
          }}
        />
      </Link>
   
      {/* {data.relationships.subthemes ? (
        <ul>
          {data.relationships.subthemes.map(subTheme => (
            <SubThemeComponent data={subTheme} />
          ))}
        </ul>
      ) : (
        <div>No subthemes</div>
      )} */}
    </div>
  )
  

export default ({ data }) => (
  <div>
    <IntroText>
    Explore themes raised in the film more deeply via collections of interviews, articles, questions, and clips.
  </IntroText>
    {data.allTaxonomyTermThemes.edges.map((edge, i) => (
      <ThemeComponent data={edge.node} />
    ))}
  </div>
)

export const query = graphql`
  query ThemesQuery {
    allTaxonomyTermThemes {
        edges {
          node {
            id
            name
            description {
                processed
              }
            relationships {
                field_theme_image {
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