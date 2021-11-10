const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
    title: {
        type:String,
    },

    content: {
        type:String,
    },
    
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


const Post = mongoose.model('Post', PostSchema);

module.exports = { Post }