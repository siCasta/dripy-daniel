const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('Calculates a math expression')
        .addStringOption(option =>
            option
                .setName('expression')
                .setRequired(true)
                .setDescription('The expression to calculate')
        ),
    async execute(interaction) {
        const expression = interaction.options.getString('expression')
        const result = eval(expression)
        await interaction.reply({
            content: `${expression} = ${result}`,
        })
    }
}