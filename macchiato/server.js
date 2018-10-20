const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
const Mailchimp = require('mailchimp-api-v3')
const Raven = require('raven-js')
const md5 = require('md5')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

const MAILCHIMP_API_KEY = dev ? null : process.env.MAILCHIMP_API_KEY
const MAILING_LIST_ID_ANDROID = '15bb220d61'
const MAILING_LIST_ID_MAIN = 'abf5b8a24b'

const SENTRY_DNS = dev ? null : 'https://b12f9921b8414403a15113935caa143a@sentry.io/1274188'

if (SENTRY_DNS) {
    Raven.config(SENTRY_DNS).install()
}

const mailchimp = MAILCHIMP_API_KEY ? new Mailchimp(MAILCHIMP_API_KEY) : null

const addToMailingList = (email, list_id, mc, mergeFields) => {
    const req = {
        method: 'put',
        path: '/lists/' + list_id + '/members/' + md5(email),
        body: {
            email_address: email,
            status: 'subscribed',
            merge_fields: mergeFields
        }
    }

    if (mc) {
        return mc.request(req)
    }

    console.log('Mailchimp API Request would be sent here, but you are in development mode:', req)
}

app.prepare().then(() => {
    express()
        .use(bodyParser.urlencoded({ extended: true }))
        .post('/mailinglist-signup', (req, res) => {
            const FNAME = req.body.firstName
            const LNAME = req.body.lastName
            const email = req.body.email

            const REFNAME = req.body.pageUrl

            const DAILY = 'Yes'
            const EDITION = 'Global Edition'

            addToMailingList(email, MAILING_LIST_ID_MAIN, mailchimp, {
                FNAME,
                LNAME,
                REFNAME,
                DAILY,
                EDITION
            })
                .then(function() {
                    res.sendStatus(200)
                    return res
                })
                .catch(function(e) {
                    console.log(e)
                    res.sendStatus(422)

                    if (SENTRY_DNS) {
                        Raven.captureException(e)
                    }

                    return e
                })
        })
        .post('/android-signup', (req, res) => {
            const email = req.body.email

            addToMailingList(email, MAILING_LIST_ID_ANDROID, mailchimp)
                .then(function() {
                    res.sendStatus(200)
                    return res
                })
                .catch(function(e) {
                    console.log(e)
                    res.sendStatus(422)

                    if (SENTRY_DNS) {
                        Raven.captureException(e)
                    }

                    return e
                })
        })
        .use(handler)
        .listen(3000)
})
