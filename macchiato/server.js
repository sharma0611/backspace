// express
const express = require('express')

// request middleware
const bodyParser = require('body-parser')

// server side rendering
const next = require('next')

// app setup
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

// routes
const routes = require('./routes')
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
    express()
        .use(bodyParser.urlencoded({ extended: true }))
        .use(handler)
        .listen(3000)
})
