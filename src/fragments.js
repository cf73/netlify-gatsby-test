export const PosterImageClipFragment = graphql`
  fragment PosterImageClipFragment on node__clip {
    title
    field_external_video_url {
      uri
      title
    }
    relationships {
      field_poster_image {
        localFile {
          publicURL
        }
      }
    }
  }
`;

export const ArticleFragment = graphql`
  fragment ArticleFragment on node__article {
    title
    field_include_in_the_teaching_se
    field_short_version {
      processed
    }
    field_author {
      processed
    }
    relationships {
      field_main_image {
        localFile {
          publicURL
        }
      }
    }
  }
`;

export const InterviewFragment = graphql`
  fragment InterviewFragment on node__interview {
    title
    changed
    field_key_quote {
      processed
    }
    relationships {
      field_interviewee {
        localFile {
          publicURL
        }
      }
    }
  }
`
export const FAQFragment = graphql`
  fragment FAQFragment on node__faq {
    title
    relationships {
      field_faq_image {
        localFile {
          publicURL
        }
      }
    }
    field_expert_1 {
      value
      format
      processed
    }
    changed
  }
`

export const ClipFragment = graphql`
  fragment ClipFragment on node__clip {
    field_episode
    title
    field_external_video_url {
      uri
    }
    field_title_of_clip {
      processed
    }
     relationships {
      field_re {
        __typename
        ... on node__faq {
          ...FAQFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
      }
      field_poster_image {
        localFile {
          publicURL
        }
      }
    }
  }
`

export const QuickfactWithRelatedContentFragment = graphql`
  fragment QuickfactWithRelatedContentFragment on node__quickfact {
    title
    field_quickfact {
      value
      format
      processed
      summary
    }
    relationships {
      field_related_content {
        __typename
        ... on node__faq {
          ...FAQFragment
        }
        ... on node__clip {
          ...PosterImageClipFragment
        }
        ... on node__article {
          ...ArticleFragment
        }
      }
    }
  }
`

