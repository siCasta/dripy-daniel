require('dotenv').config()
const { Client, Intents, Collection } = require('discord.js')
const { REST } = require('@discordjs/rest')
const fs = require('fs')
const path = require('path')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
const eventsPath = path.join(__dirname, 'events')
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

// comandos
for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    client.commands.set(command.data.name, command)
}

// eventos
for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    }
}

module.exports = client