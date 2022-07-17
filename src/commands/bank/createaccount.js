const User = require('../../models/User')
const BankAccount = require('../../models/BankAccount')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createaccount')
        .setDescription('Creates a bank account')
        .addStringOption(option =>
            option
                .setName('type')
                .setRequired(true)
                .setDescription('The type of account to create (checking or savings)')
        )
        .addNumberOption(option =>
            option
                .setName('balance')
                .setDescription('The amount of money to deposit into the account')
                .setRequired(false)
        ),
    async execute(interaction) {
        const type = interaction.options.getString('type')
        const balance = interaction.options.getNumber('balance') || 0

        if (!['checking', 'savings'].includes(type)) {
            await interaction.reply({ content: 'Invalid account type!', ephemeral: true })
            return
        }

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

        if (user.bankAccounts.length >= 2) {
            await interaction.reply({ content: 'You already have two bank accounts!', ephemeral: true })
            return
        }

        if (balance < 0) {
            await interaction.reply({ content: 'You cannot create a bank account with a negative balance!', ephemeral: true })
            return
        }

        if (balance > user.wallet) {
            await interaction.reply({ content: 'You cannot create a bank account with a balance greater than your wallet!', ephemeral: true })
            return
        }

        user.wallet -= balance
        await user.save()

        const bankAccount = await BankAccount.create({
            userId: user._id,
            type,
            balance,
        })

        user.bankAccounts.push(bankAccount._id)
        await user.save()

        await interaction.reply({ content: `Created account ${bankAccount.type} with balance ${bankAccount.balance}`, ephemeral: true })
    }
}