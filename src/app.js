const client = require('./settings.js')
const { token, mongoUri } = require('./utils/constants.js')
const { connect } = require('./mongodb')

async function start() {
    await connect(mongoUri)
    await client.login(token)
}

start()