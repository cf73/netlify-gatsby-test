module.exports = {
  siteMetadata: {
    title: 'Race: The Power of an Illusion',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    //  apiBase: `api`, // optional, defaults to `jsonapi`
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `http://distributeddesign.institute/RacePI/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      // We need filesystem source plugin to add publicURL function to File nodes
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `placeholder`,
        // path is required param, so let's just point it to single file to not create
        // much unnecessary work for it
        path: `${__dirname}/gatsby-config.js`,
      },
    },
  ],
}
