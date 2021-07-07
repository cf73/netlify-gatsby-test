import React from 'react'

const ContentNodeComponent = ({ data }) => (
  <li>
    <strong>Article</strong>: {data.title}
  </li>
)

const SubThemeComponent = ({ data }) => (
  <li>
    Subtheme: <strong>{data.name}</strong>
    {data.relationships.articles ? (
      <ul>
        {data.relationships.articles.map(article => (
          <ContentNodeComponent data={article} />
        ))}
      </ul>
    ) : (
      <span style={{ color: 'red' }}> (no articles)</span>
    )}
  </li>
)

const ThemeComponent = ({ data }) => (
  <li>
    Theme: <strong>{data.name}</strong>
    {data.relationships.subthemes ? (
      <ul>
        {data.relationships.subthemes.map(subTheme => (
          <SubThemeComponent data={subTheme} />
        ))}
      </ul>
    ) : (
      <div>No subthemes</div>
    )}
  </li>
)

export default ({ data }) => (
  <ul>
    {data.allTaxonomyTermThemes.edges.map(({ node }) => (
      <ThemeComponent data={node} />
    ))}
  </ul>
)

export const query = graphql`
  query ThemesArticlesQuery {
    allTaxonomyTermThemes {
      edges {
        node {
          id
          name
          relationships {
            subthemes: backref_field_belongs_to_theme {
              name
              id
              relationships {
                articles: backref_field_belongs_to_subtheme_node_article {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`
