const React = require('react')

export default ({ data }) => (
    <div>
      <strong>{data.nodeClip.title}</strong>
      
      
    </div>
  )

export const clipQuery = graphql`
  query clipQuery($id: String) {
    nodeClip(id: { eq: $id }) {
      id
      title
    }
}
`