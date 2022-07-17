const mongoose = require('mongoose')

exports.connect = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error(error)
    }
}