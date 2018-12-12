import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = 'Sea Food'
const defaultOGURL = ''
const defaultOGImage = ''

class Head extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <title>{this.props.title || ''}</title>
        <meta
          name="description"
          content={this.props.description || defaultDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
        <link rel="apple-touch-icon" href="/static/touch-icon.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta property="og:url" content={this.props.url || defaultOGURL} />
        <meta property="og:title" content={this.props.title || ''} />
        <meta
          property="og:description"
          content={this.props.description || defaultDescription}
        />
        <meta name="twitter:site" content={this.props.url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={this.props.ogImage || defaultOGImage} />
        <meta property="og:image" content={this.props.ogImage || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <link rel="stylesheet" href="/static/css/style.css" />
        
      </NextHead>
    )
  }
} 

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
