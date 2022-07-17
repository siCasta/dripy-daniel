const mongooose = require('mongoose')
const { Schema, model } = mongooose

const userSchema = new Schema({
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    discordTag: {
        type: String,
        required: true,
    },
    discriminator: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    bankAccounts: {
        type: [Schema.Types.ObjectId],
        ref: 'BankAccount',
        default: [],
        max: 2,
    },
    inventory: [{
        type: Object,
    }],
    wallet: {
        type: Schema.Types.Decimal128,
        default: 0.00,
    },
}, {
    timestamps: true,
})


module.exports = model('User', userSchema)