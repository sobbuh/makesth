import React from "react"
import { Link, graphql } from "gatsby"


import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import addToMailchimp from 'gatsby-plugin-mailchimp'

class BlogIndex extends React.Component {
  
  state = {
    name: null,
    email: null,
    subscribers: 76
  }

  _handleChange = e => {
    this.setState({
      [`${e.target.name}`]: e.target.value,
    })
  }

  _handleSubmit = e => {
    e.preventDefault();
    var newSubs = this.state.subscribers + 1;
    this.setState({
      subscribers: newSubs
    })
    
    addToMailchimp(this.state.email)
    .then(({msg, result}) => {
      console.log('msg', `${result}: ${msg}`);
      if (result !== 'success') {
        throw msg;
      }
      alert(msg);
    })
    .catch(err => {
      console.log('err', err);
      alert(err);
    });
  }


  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const subscribers = this.state.subscribers
    
    return (
      <Layout location={this.props.location} title={siteTitle}>
        
        <headerDiv>
        <SEO title="Home" />

        <p> sign up to get updates when we release new chapters + examples</p>
        
         <form onSubmit={this._handleSubmit}>
            <input type="email" onChange={this._handleChange} placeholder="email" name="email" />
            <input type="submit" />
          
          </form>
       
        </headerDiv>

        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const clickable = node.frontmatter.publish || "false"

          if (!title.includes('ex-')){
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                  
                </h3>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
                }
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`
