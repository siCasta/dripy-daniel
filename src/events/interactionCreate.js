const User = require('../models/User')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        const user = await User.findOne({ discordId: interaction.user.id })

        if (!user) {
            await User.create({
                discordId: interaction.user.id,
                username: interaction.user.username,
                discordTag: interaction.user.tag,
                discriminator: interaction.user.discriminator,
                avatar: interaction.user.avatarURL(),
            })
        }

        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}