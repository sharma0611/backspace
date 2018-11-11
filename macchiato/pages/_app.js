// @flow
import React from 'react'
import App, { Container } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import { Provider as RebassProvider, Box } from 'rebass'

// import analyticsClient from '../utils/analytics/analyticsClient'
import theme from '../App/Theme'
import Navbar from '../App/Components/Navbar'
import AppIcons from '../App/Components/AppIcons'

// state
import withState from '../App/State/withState'

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; }
  a, a:visited { color: inherit; }
`

class MyApp extends App {
    // constructor(props) {
    //     super(props)

    //     if (process.browser) {
    //         analyticsClient.init()
    //     }
    // }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <RebassProvider theme={theme}>
                <Container>
                    <GlobalStyle />
                    <Box>
                        <Helmet titleTemplate="%s" defaultTitle="">
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <meta charSet="utf-8" />
                            {AppIcons}
                            {/* Social Info */}
                            {/* Facebook */}
                            <meta property="og:locale" content="en_GB" />
                            <meta property="og:type" content="website" />
                            <meta property="og:title" content="" />
                            <meta property="og:description" content="" />
                            <meta property="og:site_name" content="" />
                            <meta property="og:image" content="" />
                            <meta property="og:image:type" content="image/png" />
                            {/* Twitter */}
                            <meta name="twitter:card" content="summary" />
                            <meta name="twitter:description" content="" />
                            <meta name="twitter:title" content="" />
                            <meta name="twitter:site" content="" />
                            <meta name="twitter:creator" content="" />
                            <meta name="twitter:image" content="" />
                            {/* Schema for Google+ */}
                            <meta itemprop="name" content="" />
                            <meta itemprop="description" content="" />
                            <meta itemprop="image" content="" />
                        </Helmet>
                        <Box pb={8}>
                            <Navbar />
                            <Component {...pageProps} />
                        </Box>
                    </Box>
                </Container>
            </RebassProvider>
        )
    }
}

export default MyApp
