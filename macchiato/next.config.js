require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const withOptimizedImages = require('next-optimized-images')

module.exports = withOptimizedImages({
    webpack: config => {
        config.plugins = config.plugins || []

        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(
                    __dirname,
                    process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.local'
                ),
                systemvars: true
            })
        ]

        return config
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret'
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        RELAY_ENDPOINT: process.env.RELAY_ENDPOINT
    }
})
