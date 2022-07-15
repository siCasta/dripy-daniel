require('dotenv').config()
const { Client, Intents } = require('discord.js')
const fs = require('fs')
const path = require('path')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

const eventsPath = path.join(__dirname, 'events')
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

// eventos

for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    }
}

module.exports = client