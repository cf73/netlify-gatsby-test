const React = require('react')
const ReactFlex = require('react-flex')
const queryString = require('query-string');

require('react-flex/index.css')
import Img from 'gatsby-image'
import kebabCase from 'lodash/kebabCase'
import Card from '../components/card.js'
import SubthemeSection from '../components/subtheme.js'

const FlipMove = require('react-flip-move');
import styled from 'styled-components';


const ThemeTitle = styled.div`
  width: 720px;
  margin-top: 50vh;
  margin-bottom:30px;
  color: inherit;
  font-family: "lato";
  font-weight: 800;
  text-rendering: optimizeLegibility;
  font-size: 36px;
  line-height: 1.1;
  letter-spacing: 0.14em;
  color: white;
  mix-blend-mode: overlay;
  opacity: 0.9;
  text-transform: uppercase;
`
const ThemeDescription = styled.div`
  color: white;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.5;
  width: 490px;
  position:relative;
  z-index:99999;
`
const ThemeHeader = styled.div`
  width: 100%;
  height: 100vh;
  background-image: ${props => props.background ?  `url(${props.background})` : `none`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: lightgrey;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -999;
`
const HeaderDimmer = styled.div`
  width: 100%;
  position: absolute;
  left:0;
  right:0;
  top:0;
  z-index: 99999999;
  height:50vh;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,d3dde5+100&0.5+1,0+100 */
  background: -moz-linear-gradient(top, rgba(0,0,0,0.5) 0%, rgba(2,2,2,0.5) 1%, rgba(211,221,229,0) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(0,0,0,0.5) 0%,rgba(2,2,2,0.5) 1%,rgba(211,221,229,0) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(2,2,2,0.5) 1%,rgba(211,221,229,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80000000', endColorstr='#00d3dde5',GradientType=0 ); /* IE6-9 */
`
const Dimmer = styled.div`
  width: 100%;
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  height:50vh;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#d3dde5+11,000000+100&0+0,0.5+100 */
  background: -moz-linear-gradient(top, rgba(211,221,229,0) 0%, rgba(211,221,229,0.06) 11%, rgba(0,0,0,0.5) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, rgba(211,221,229,0) 0%,rgba(211,221,229,0.06) 11%,rgba(0,0,0,0.5) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, rgba(211,221,229,0) 0%,rgba(211,221,229,0.06) 11%,rgba(0,0,0,0.5) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d3dde5', endColorstr='#80000000',GradientType=0 ); /* IE6-9 */
`

const ThemeIntro = styled.div`
  margin-left: 30px;
  margin-top: 120px;
`

const ThemeMain = styled.div`
  position: absolute;
  top: 66vh;
  width: 100%;
`

class ThemePage extends React.Component {
  render() {
    const theme = this.props.data.taxonomyTermThemes

    const queryParams = queryString.parse(this.props.location.search);

    const getShortname = (subtheme) => {
      const parts = subtheme.name.split('-');
      return encodeURIComponent(kebabCase(parts[parts.length - 1]))
    }

    return (
      <div>
        <ThemeHeader background={theme.relationships.field_theme_image && theme.relationships.field_theme_image.localFile.publicURL}>
        <HeaderDimmer />
         <Dimmer />
          <ThemeIntro>
            <ThemeTitle>{theme.name}</ThemeTitle>
            {theme.description ? (
              <ThemeDescription
                dangerouslySetInnerHTML={{ __html: theme.description.processed }}
              />
            ) : null}
          </ThemeIntro>
        </ThemeHeader>
        <ThemeMain>
          {
            theme.relationships.subthemes.sort((a, b) => {
                var nameA = getShortname(a);
                var nameB = getShortname(b);
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              }).map(subtheme => (
                <SubthemeSection
                  data={subtheme}
                  name={getShortname(subtheme)}
                  filter={queryParams[getShortname(subtheme)]}
                  queryParams={queryParams}
                />
              ))
          }
        </ThemeMain>

        <br />
      </div>
    )
  }
}

export default ThemePage

export const pageQuery = graphql`
  query themeQuery($id: String) {
    taxonomyTermThemes(id: { eq: $id }) {
      id
      name
      description {
        processed
      }
      relationships {
        field_theme_image {
          localFile {
            publicURL
            childImageSharp {
              sizes(maxWidth: 960, quality: 90) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }

        subthemes: backref_field_belongs_to_theme {
          name
          id
          description {
            processed
          }
          relationships {
            articles: backref_field_belongs_to_subtheme_node_article {
              ...ArticleFragment
            }
            clips: backref_field_belongs_to_subtheme_node_clip {
              ...PosterImageClipFragment
            }
            interviews: backref_field_which_subtheme_does_this_b_node_interview {
              ...InterviewFragment
            }
            faqs: backref_field_belongs_to_subtheme_node_faq {
              ...FAQFragment
            }
          }
        }
      }
    }
  }
`
