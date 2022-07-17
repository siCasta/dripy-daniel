const { Client, Intents, Collection } = require('discord.js')
const { REST } = require('@discordjs/rest')
const fs = require('fs')
const path = require('path')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(commandsPath)

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

// comandos
for (const folder of commandFolders) {
    for (const file of fs.readdirSync(path.join(commandsPath, folder))) {
        const command = require(path.join(commandsPath, folder, file))
        client.commands.set(command.data.name, command)
    }
}

// eventos
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event = require(filePath)

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

module.exports = client