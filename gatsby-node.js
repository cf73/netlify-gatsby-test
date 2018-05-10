const _ = require("lodash");
const kebabCase = require("lodash/kebabCase");
const path = require("path");

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const themeTemplate = path.resolve(`src/templates/theme.js`)
    const articleTemplate = path.resolve(`src/templates/article.js`)
    const clipTemplate = path.resolve(`src/templates/clip.js`)
    const interviewTemplate = path.resolve(`src/templates/interview.js`)
    
    // Query for markdown nodes to use in creating pages.
    graphql(
      `
        {
          allTaxonomyTermThemes {
            edges {
              node {
                id
                name
              }
            }
          }
          allNodeArticle {
            edges {
              node {
                id
                title
              }
            }
          }
          allNodeInterview {
            edges {
              node {
                id
                title
              }
            }
          }
          allNodeClip {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `
    ).then(result => {
      if (result.errors) {
        resolve()
        // reject(result.errors);
      }


      // Create blog posts pages.
      _.each(result.data.allTaxonomyTermThemes.edges, edge => {
        createPage({
          path: `/themes/${kebabCase(edge.node.name)}`, // required
          component: themeTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
      _.each(result.data.allNodeArticle.edges, edge => {
        createPage({
          path: `/articles/${kebabCase(edge.node.title)}`, // required
          component: articleTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
      _.each(result.data.allNodeInterview.edges, edge => {
        createPage({
          path: `/interviews/${kebabCase(edge.node.title)}`, // required
          component: interviewTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
      _.each(result.data.allNodeClip.edges, edge => {
        createPage({
          path: `/clips/${kebabCase(edge.node.title)}`, // required
          component: clipTemplate,
          context: {
            id: edge.node.id,
          },
        })
      })
      resolve()
    })
  })
}