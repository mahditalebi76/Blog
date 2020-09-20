const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        trim: true
    },
    post: {
        type: ObjectId,
        index: true
    },
    author: String,
    created: {
        type: Date,
        default: Date.now
    }
})




module.exports = mongoose.model('Comment', commentSchema);