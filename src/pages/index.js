import React from 'react'
import Link from 'gatsby-link'
import kebabCase from 'lodash/kebabCase'

const ContentNodeComponent = ({ data }) => (
  <li>
    <strong>{data.__typename}</strong>: {data.title}
  </li>
)

const SubThemeComponent = ({ data }) => (
  <li>
    Subtheme: <strong>{data.name}</strong>
    {data.relationships.contentNodes ? (
      <ul>
        {data.relationships.contentNodes.map(contentNode => (
          <ContentNodeComponent data={contentNode} />
        ))}
      </ul>
    ) : (
      <span style={{ color: 'red' }}> (no contentNodes)</span>
    )}
  </li>
)

const ThemeComponent = ({ data }) => (
  <li>
    Theme: <Link to={`/themes/${kebabCase(data.name)}`}>{data.name}</Link>
    {/* {data.relationships.subthemes ? (
      <ul>
        {data.relationships.subthemes.map(subTheme => (
          <SubThemeComponent data={subTheme} />
        ))}
      </ul>
    ) : (
      <div>No subthemes</div>
    )} */}
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
  query IndexQuery {
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
                contentNodes: backref_field_belongs_to_subtheme {
                  __typename
                  ... on node__article {
                    title
                  }
                  ... on node__faq {
                    title
                  }
                  ... on node__clip {
                    title
                  }
                  ... on node__quickfact {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
