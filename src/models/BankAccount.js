const mongooose = require('mongoose')
const { Schema, model } = mongooose

const bankAccountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    balance: {
        type: Schema.Types.Decimal128,
        default: 0.00,
    },
    type: {
        type: String,
        enum: ['checking', 'savings'],
        required: true,
    },
}, {
    timestamps: true,
})


module.exports = model('BankAcount', bankAccountSchema)
