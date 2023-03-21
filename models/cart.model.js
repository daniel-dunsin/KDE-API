const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    collectibles: [{
        type: Schema.Types.ObjectId, ref: "Listing"
    }]
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart