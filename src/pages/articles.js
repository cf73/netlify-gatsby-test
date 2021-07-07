import React from 'react'
import styled from 'styled-components'
import './articles.css'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'



// const ContentNodeComponent = ({ data }) => <li>{data.name}</li>

// const SubThemeComponent = ({ data }) => (
//   <li>
//     Subtheme: <strong>{data.name}</strong> <code>{data.id}</code>
//     {/* {data.relationships.field_belongs_to_theme ? (
//       <ul>
//         {data.relationships.field_belongs_to_theme.map(article => (
//           <ContentNodeComponent data={article} />
//         ))}
//       </ul>
//     ) : (
//       <span style={{ color: 'red' }}> (no articles)</span>
//     )} */}
//   </li>
// )


// .card:nth-child(odd) .card__image {
//   /* flexbox can change order of rendered elements*/
//   order: 2;
// }
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
  padding: 60px 30px;
  margin-bottom: 60px;
  font-family: 'Lato';
  color: snow;
  background-color: #2b2b2b;
`
const ArticleTitle = styled.div`
  font-family: 'Lato';
  font-size:20px;
  font-weight: 700;
  color: black;
  padding: 0px 30px 0 30px;
  line-height:1.25;
  margin-bottom: 7.5px;
`
const ArticleImage = styled.div`
  margin-bottom:30px;
  position: absolute;
  top: 0;
  bottom: 0;
  background-image: ${props =>
    props.background ? `url(${props.background})` : `none`};
`

const ArticleSummary = ({ data }) => {
  console.log(data)
  return (
    <Link style={{
      flexGrow: 0,
      flexShrink: 1,
      marginBottom: 30,
      flexBasis: '33%',
      textDecoration: 'none',
      color: 'inherit'
    }} to={`/articles/${kebabCase(data.title)}`}>
      <div className={"articleCard"}>
       
        <div style={{flex: '1 1 auto', position: 'relative', marginBottom:30}}>
          <ArticleImage
            background={
              data.relationships.field_main_image &&
              data.relationships.field_main_image.localFile.publicURL
            }
            className={"articleCardImage"}>
              {data.relationships.field_theme_image && data.relationships.field_theme_image.localFile.publicURL}
          </ArticleImage>
        </div>
        <div style={{paddingBottom:30}}>
          <ArticleTitle>
           {data.title}
          </ArticleTitle>
          <p style={{marginBottom:7.5, fontFamily:'Lato', fontSize:16, fontWeight:300, lineHeight:1.25, marginLeft:30, marginBottom:15}}>Article by {data.field_author && data.field_author.processed}</p>

          
          <div className="articleExcerpt">
            {data.field_article_summary && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data.field_article_summary.processed,
                }}
              />

            )}
          </div>
        </div>
        {/* {data.relationships.field_belongs_to_subtheme ? (
        <ul>
          {data.relationships.field_belongs_to_subtheme.map(subTheme => (
            <ArticleSummary data={subTheme} />
          ))}
        </ul>
      ) : (
        <div>No subthemes</div>
      )} */}
      </div>
      </Link>
  )
}

export default ({ data }) => (
  <div>
    <IntroText dangerouslySetInnerHTML={{
                  __html: data.taxonomyTermArticlesPage.description && data.taxonomyTermArticlesPage.description.processed,
                }} />
        
    <div className={"articles"}>
      <GreyBackground />
      
      {data.allNodeArticle.edges.map((edge, i) => (
        <ArticleSummary data={edge.node} />
      ))}
    </div>
  </div>
)

export const query = graphql`
  query ArticlesQuery {
    taxonomyTermArticlesPage {
      description {
        processed
      }
    }
    allNodeArticle {
      edges {
        node {
          id
          title
          field_author {
            processed
          }
          field_medium_version {
            processed
          }
          field_article_summary {
            processed
          }
          relationships {
            field_main_image {
              id
              localFile {
                publicURL
              }
            }
            field_belongs_to_subtheme {
              id
              name
              relationships {
                field_belongs_to_theme {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`
